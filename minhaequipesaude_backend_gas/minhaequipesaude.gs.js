function _env() {
  return {
    ENV_SPREADSHEET_ID: '',
    SH_ENDERECO: '',
    SH_PROFISSIONAL: '',
    SH_EQUIPE: ''
  }
}

function doGet(e) {
  let op = e.parameter.action;
  let sheetNumber = e.parameter.sheetnumber;
  let ss = SpreadsheetApp.open(DriveApp.getFileById(env().ENV_SPREADSHEET_ID));

  if (op == "read")
    return getBySheetName(ss, sheetNumber);

  if (op == "search") {
    let logradouro = e.parameter.logradouro;
    let numero = e.parameter.numero;
    return searchAddress(ss, logradouro, numero);
  }
}

function getBySheetName(ss, sheetNumber) {
  if (sheetNumber == 1) {
    return getDataAddress(ss.getSheetByName(env().SH_ENDERECO))
  }

  if (sheetNumber == 2) {
    return getDataAll(ss.getSheetByName(env().SH_PROFISSIONAL))
  }

  if (sheetNumber == 3) {
    return getDataAll(ss.getSheetByName(env().SH_EQUIPE))
  }

}

function getDataAll(sheetName) {
  let output = ContentService.createTextOutput(), data = {};
  data.content = readData(sheetName);
  output.setContent(JSON.stringify(data));
  return output.setMimeType(ContentService.MimeType.JSON);
}

function getDataAddress(sheetName) {
  let output = ContentService.createTextOutput(), data = {};
  data.content = readData(sheetName, ['numero']);
  output.setContent(JSON.stringify(data));
  return output.setMimeType(ContentService.MimeType.JSON);
}

// Remove vírgulas, remove espaços duplicados e transforma em minúsculo
function limparTexto(texto) {
  if (!texto) return "";
  return String(texto)
    .replace(/,/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function searchAddress(ss, logradouroBuscadoBruto, numeroBuscado) {
  let logradouroBuscado = limparTexto(logradouroBuscadoBruto);
  let output = ContentService.createTextOutput();
  let response = { success: false, data: null };

  if (!logradouroBuscado || !numeroBuscado) {
    response.error = "Parametros 'logradouro' e 'numero' sao obrigatorios.";
    output.setContent(JSON.stringify(response));
    return output.setMimeType(ContentService.MimeType.JSON);
  }

  let sheetEndereco = ss.getSheetByName(env().SH_ENDERECO);
  let todosEnderecos = readData(sheetEndereco);

  if (todosEnderecos instanceof Error) {
    response.error = todosEnderecos.message;
    output.setContent(JSON.stringify(response));
    return output.setMimeType(ContentService.MimeType.JSON);
  }

  let encontrado = todosEnderecos.find(function (item) {
    let logradouroPlanilha = String(item.logradouro || "").trim().toLowerCase();
    let numeroPlanilha = String(item.numero || "").trim().toLowerCase();

    return logradouroPlanilha === String(logradouroBuscado).trim().toLowerCase() &&
      numeroPlanilha === String(numeroBuscado).trim().toLowerCase();
  });

  if (encontrado) {
    response.success = true;
    response.data = encontrado;
  } else {
    response.message = "Nenhum endereco correspondente foi encontrado.";
  }

  output.setContent(JSON.stringify(response));
  return output.setMimeType(ContentService.MimeType.JSON);
}

function readData(sheet, colunasIgnoradas = []) {
  try {
    const ignorarFormatado = colunasIgnoradas.map(p => p.trim());
    let originalHeaders = getHeaderRow(sheet);

    // Cria a lista modificada com underlines
    let properties = originalHeaders.map(function (p) {
      return String(p).replace(/\s+/g, '_');
    });

    let rows = getDataRows(sheet),
      data = [];

    for (let r = 0, l = rows.length; r < l; r++) {
      let row = rows[r],
        record = {};

      for (let p in properties) {
        let columnName = properties[p];
        let originalName = originalHeaders[p];
        let cellValue = row[p];

        if (ignorarFormatado.includes(originalName)) {
          continue;
        }

        if (columnName === "observacao" && typeof cellValue === "string" && cellValue !== "") {
          record[columnName] = cellValue.split(';').map(function (item) {
            return item.trim();
          });
        } else {
          record[columnName] = cellValue;
        }
      }
      data.push(record);
    }
    return data;
  } catch (error) {
    return error;
  }
}

function getHeaderRow(sheet) {
  try {
    let lastColumn = sheet.getLastColumn();
    if (lastColumn === 0) return [];
    return sheet.getRange(1, 1, 1, lastColumn).getValues()[0];
  } catch (error) {
    return error;
  }
}

function getDataRows(sheet) {
  try {
    let lastRow = sheet.getLastRow();
    let lastColumn = sheet.getLastColumn();
    if (lastRow <= 1 || lastColumn === 0) return [];

    return sheet.getRange(2, 1, lastRow - 1, lastColumn).getValues();
  } catch (error) {
    return error;
  }
}

/** 
 * 
   
ROTAS
  ENDEREÇOS
  ?action=read&sheetnumber=1
  
  PROFISSIONAL
  ?action=read&sheetnumber=2 
  
  EQUIPE
  ?action=read&sheetnumber=3

  PESQUISAR LOGRADOURO
  ?action=search&logradouro=Rua das Flores&numero=150
  
CRIAR PLANILHA
  Crie uma planilha com 3 folhas(aba). 
  os nomes dado as planilhas devem ser atribuido as variaveis da função env.
  SH_ENDERECO : '{NOME_DA_FOLHA_1}',
  SH_PROFISSIONAL: '{NOME_DA_FOLHA_2}',
  SH_EQUIPE: '{NOME_DA_FOLHA_3}'


COLUNA DAS FOLHAS:
  ENDERECO
  id	logradouro	bairro	cidade	cep	complemento	observacao	acs	equipe_vinculada

  PROFISSIONAL
  id	nome	especialidade	registro	descricao	equipe	unidade

  EQUIPE
  id	nome	ine	apelido	registro	descricao	unidade

*/