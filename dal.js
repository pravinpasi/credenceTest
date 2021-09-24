/*
File            : dal.js (DATA ACCESS LAYER)
All database related functions are present here.
*/

var mysql 	= require('mysql');

exports.dalResult = dalResult = {
    success: 0,
    connectionError: 1,
    queryError: 2,
    noResult: 3
}

var pool = mysql.createPool({
	connectionLimit : 100,
	host			: '127.0.0.1',
	user			: 'root',
	password		: '',
	database		: 'nodeTest'
});

function query(query, func)
{
    console.log("QUERY="+query);
    pool.getConnection(function(err, connection) 
    {
        if(err)	
        {
			connection.release();
			console.log('SQL DB: ERR 1 == ' + err);
            func(dalResult.connectionError, 0);
			return;
		}	
        connection.query(query, function(err, rows) 
        {
            connection.release();
            if(!err)	
            {
                if(rows.length == 0)	
                {
                    func(dalResult.noResult, 0);
                    return;
                }
                else
                {
                    func(dalResult.success, rows);
                    return;
                }
            }
            else
            {
                func(dalResult.queryError, 0);
                console.log('SQL DB: ERR 2 == ' +err );
                return;
            }
        });
		
        connection.on('error', function(err)	{
            connection.release();
            console.log('Error in on error : ' +err);
            console.log('SQL DB: ERR 3');
            func(dalResult.queryError, 0);
            return;
        });
	});	
}

exports.createTable = function()
{
    
    query("Create table IF NOT EXISTS `moviedata`(`id` int(11) NOT NULL Primary Key AUTO_INCREMENT,`name` varchar(50),`img` varchar(100),`description` text)",function(err,rows)
    {
        if(err == dalResult.success)
            console.log("Table Created Successfully");
        else
            console.log("Error Creating Table " + err);
    });
}

exports.insert = function(name,image,description,func)
{
    query('Insert into moviedata(name,img,description) values ("'+name+'","'+image+'","'+description+'")',func);
}

exports.update = function(name,image,description,id,func)
{
    query('update moviedata set name="'+name+'",img="'+image+'",description="'+description+'" where id="'+id+'"',func);
}

exports.delete = function(id,func)
{
    query("delete from moviedata where id='"+id+"'",func);
}

exports.read = function(id,type,func)
{
    if(type == 'all')
        query("Select * from moviedata",func);
    else
        query("Select * from moviedata where id='"+id+"'",func);
}