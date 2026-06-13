function _env() {
  return {
    ENV_SPREADSHEET_ID : '',
    SH_ENDERECO : '',
    SH_PROFISSIONAL: '',
    SH_UNIDADE: ''
  }
}
  
function doGet(e) {
  let op = e.parameter.action;
  let sheetNumber = e.parameter.sheetnumber;
  let ss = SpreadsheetApp.open(DriveApp.getFileById(env().ENV_SPREADSHEET_ID));

  if (op == "read")
    return getBySheetName(ss, sheetNumber);
}
  
function getBySheetName(ss, sheetNumber) {
  if(sheetNumber == 1) {
    return getDataAll(ss.getSheetByName(env().SH_ENDERECO))
  }

  if(sheetNumber == 2) {
    return getDataAll(ss.getSheetByName(env().SH_PROFISSIONAL))
  }

  if(sheetNumber == 3) {
    return getDataAll(ss.getSheetByName(env().SH_UNIDADE))
  }

}
  
function getDataAll(sheetName) {
  let output = ContentService.createTextOutput(), data = {};
  data.content = readData(sheetName);
  output.setContent(JSON.stringify(data));
  return output;
}

function readData(sheet) {
  try {    
    properties = getHeaderRow(sheet);
    properties = properties.map(
      function (p) { 
        return p.replace(/\s+/g, '_'); 
      });

    let rows = getDataRows(sheet),
      data = [];
    for (let r = 0, l = rows.length; r < l; r++) {
      let row = rows[r],
        record = {};
      for (let p in properties) {
        record[properties[p]] = row[p];
      }
      data.push(record);
    }
    return data;

  } catch (error) {
    return error;
  }
}
  
function getDataRows(sheet) {
  try {
    return sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).getValues();
  } catch (error) {
    return error;
  }
}
  
function getHeaderRow(sheet) {
  try {
    return sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  } catch (error) {
    return error;
  }
}
  
/** 
 * 
   
ROTAS
  Endereços
  ?action=read&sheetnumber=1
  
  PRofissional
  ?action=read&sheetnumber=2 
  
  Unidade
  ?action=read&sheetnumber=3 
  
CRIAR PLANILHA
  Crie uma planilha com 3 folhas(aba). 
  os nomes dado as planilhas devem ser atribuido as variaveis da função env.
  SH_ENDERECO : '{NOME_DA_FOLHA_1}',
  SH_PROFISSIONAL: '{NOME_DA_FOLHA_2}',
  SH_UNIDADE: '{NOME_DA_FOLHA_3}'


COLUNA DAS FOLHAS:
  ENDERECO
  id	logradouro	bairro	cidade	cep	complemento	observacao	acs	equipe_vinculada

  PROFISSIONAL
  id	nome	especialidade	registro	descricao	equipe	unidade

  UNIDADE
  id	nome	ine	apelido	registro	descricao	unidade

*/