const search = (connection, tosearch, callback) => {
    let query = "SELECT DISTINCT d1.* FROM data d1";
    let inputWords = tosearch.split(" ");
  
    for (let i = 1; i < inputWords.length; i++) {
      query += ` JOIN data d${i + 1} ON d1.title = d${i + 1}.title`;
    }
  
    query += ' WHERE ';
  
    for (let i = 0; i < inputWords.length; i++) {
      let word = inputWords[i];
      query += `d${i + 1}.word = '${word}'`;
      if (i < inputWords.length - 1) {
        query += ' AND ';
      }
     
    }
    query += ';';
    console.log(query);
    connection.query(query, (error, results) => {
        if (error) throw error;
      if (error) {
        console.error("Error retrieving search: ", error);
        callback(error, null);
        return;
      }
      
      callback(null, { response: results });
    });
  };
  
  module.exports = search;
  
