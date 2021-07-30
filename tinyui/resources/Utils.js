/*eslint-env node, es6 */
let oFirstDialog;

function openFirstDialog() {
	if (oFirstDialog) {
		oFirstDialog.open();
	} else {
		oFirstDialog = new sap.ui.commons.Dialog({
			width: "400px",
			height: "550px",
			title: "Country Details",
			applyContentPadding: true,
			modal: true,
			content: [
				new sap.ui.commons.form.SimpleForm({
					content: [
						new sap.ui.core.Title({
							text: "Country Name"
						}),
						new sap.ui.commons.Label({
							text: "name"
						}),
						new sap.ui.commons.TextField({
							value: "",
							id: "name"
						}),
						new sap.ui.commons.Label({
							text: "partof"
						}),
						new sap.ui.commons.TextField({
							value: "",
							id: "partof"
						})
					]
				})
			]
		});
		oFirstDialog.addButton(new sap.ui.commons.Button({
			text: "OK",
			press: () => {
				const name = sap.ui.getCore().byId("name").getValue();
				const partof = sap.ui.getCore().byId("partof").getValue();
				const payload = {
					name,
					partof
				};
				const data = JSON.stringify(payload);
				$.ajax({
					type: "POST",
					url: "country/country.xsjs",
					contentType: "application/json",
					data: data,
					dataType: "json",
					crossDomain: true,
					success: () => {
						oFirstDialog.close();
						sap.ui.getCore().byId("tinytab").getModel().refresh(true);
						alert("Data inserted successfully");
					},
					error: (res) => {
						const message = JSON.stringify(res);
						alert(message);
					}
				});
			}
		}));
		oFirstDialog.open();
	}
}

$(function () {
	// one time fetch of CSRF token
	$.ajax({
		type: "GET",
		url: "/",
		headers: {
			"X-Csrf-Token": "Fetch"
		},
		success: (res, status, xhr) => {
			const sHeaderCsrfToken = "X-Csrf-Token";
			const sCsrfToken = xhr.getResponseHeader(sHeaderCsrfToken);
			// for POST, PUT and DELETE requests, add the CSRF token to the header
			$(document).ajaxSend((event, jqxhr, settings) => {
				if (settings.type === "POST" || settings.type === "PUT" || settings.type === "DELETE") {
					jqxhr.setRequestHeader(sHeaderCsrfToken, sCsrfToken);
				}
			});
		}
	});
});