/*eslint no-console: 0, no-unused-vars: 0*/
/*eslint-env node, es6 */

function saveCountry(country) {
	const conn = $.hdb.getConnection();
	const output = JSON.stringify(country);
	const fnCreateCountry = conn.loadProcedure("tinyworld.tinydb::createCountry");
	
	const result = fnCreateCountry({
		IM_COUNTRY: country.name,
		IM_CONTINENT: country.partof
	});
	
	conn.commit();
	conn.close();
	
	if (result && result.EX_ERROR) {
		return { body: result, status: $.net.http.BAD_REQUEST };
		// return result.EX_ERROR;
	} else {
		return { body: output, status: $.net.http.CREATED };
		// return output;
	}
}

// handle request
const body = $.request.body.asString();
const country = JSON.parse(body);

// validate input
const output = saveCountry(country);

$.response.contentType = "application/json";
$.response.setBody(output.body);
$.response.status = output.status;
