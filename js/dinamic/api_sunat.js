$(document).ready(function () {
  var token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2MzkwMjY1OTIsImV4cCI6NDc5MjYyNjU5MiwidXNlcm5hbWUiOiJmYWN0dXJhZHViYWkyMDIxIiwiY29tcGFueSI6IjIwNjA0NDY4MTMzIn0.qHArwJdOSN4HtQTIgmg_Us80Zs8p2_m8ClZbApA5hw8Apu5K9_Cwl3A32gRjnj64N0hk5pXSEvHrBPKUoKd5S134sPEv2b0dyGqD67u9gbSBI6fgyViuWrt8KWBo344EivQmwPMDcHTZ5DIa4zzCrTWpPCefa_7JuE6d2fgRu-KSKU3gZC3KlUIEQ1RAnVUP6X_GaIxWOtp-a9m5fe17H8rHt6QO_0HOxPX8xf5ukU-ZgUFJXVO96DHR-aj7Zc_k9-weWvaEDftp3t34k-Y-aLHKog46BlB1bLJqAz2azKQQlyLCidPRwLt15WaS-_sQoceW2VZF5QePGD2n69a1AsLO76xVy7Y77Tv9IwhvQdedVToMOibrM08mGnhu06CsjwY8LaQD4X71wQ8bFrchaZ17ZLRm2rbKbU_46MzyzVNC7tfc5oDEM1KhV7AngSo7Cd6qMokVZ7L7lcIrSNC2Sc0oyhoDoWTRAayozVvP-A2I66-c0Iz176qVCphj_zXmokc_QjY0ziYd2APC2_31D4oLupIZ8822OkH0_qQ3GMAdKAxMOQKHTjuMh6jb2lCmx66aFjEA-UrIDXw7kDArQp-cCt5E_68QhcIvybc-aLEldK7a5SWcJco3Z3H2qjbBN4Z_7epPbGl-vNFQC_UJp1Wxn9VtFeh5iACOq37ONPM";
  var settings = {
    // url: "https://facturacion.apisperu.com/api/v1/invoice/send",
    url: "https://facturacion.apisperu.com/api/v1/invoice/xml",
    method: "POST",
    timeout: 0,
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      ublVersion: "2.1",
      fecVencimiento: "2021-01-27T00:00:00-05:00",
      tipoOperacion: "0101",
      tipoDoc: "01",
      serie: "F001",
      correlativo: "123",
      fechaEmision: "2021-01-27T00:00:00-05:00",
      formaPago: {
        moneda: "PEN",
        tipo: "Contado",
      },
      tipoMoneda: "PEN",
      client: {
        tipoDoc: "6",
        numDoc: 20000000002,
        rznSocial: "Cliente",
        address: {
          direccion: "Direccion cliente",
          provincia: "LIMA",
          departamento: "LIMA",
          distrito: "LIMA",
          ubigueo: "150101",
        },
      },
      company: {
        ruc: 20604468133,
        razonSocial: "NEGOCIACIONES GSC E.I.R.L.",
        address: {
          direccion: "AV. BOLOGNESI NRO. 556 TACNA - TACNA - TACNA",
        },
      },
      mtoOperGravadas: 200,
      mtoOperExoneradas: 100,
      mtoIGV: 36,
      totalImpuestos: 36,
      valorVenta: 300,
      subTotal: 336,
      mtoImpVenta: 336,
      details: [
        {
          codProducto: "P001",
          unidad: "NIU",
          descripcion: "PRODUCTO 1",
          cantidad: 2,
          mtoValorUnitario: 100,
          mtoValorVenta: 200,
          mtoBaseIgv: 200,
          porcentajeIgv: 18,
          igv: 36,
          tipAfeIgv: 10,
          totalImpuestos: 36,
          mtoPrecioUnitario: 118,
        },
        {
          codProducto: "P002",
          unidad: "KG",
          descripcion: "PRODUCTO 2",
          cantidad: 2,
          mtoValorUnitario: 50,
          mtoValorVenta: 100,
          mtoBaseIgv: 100,
          porcentajeIgv: 0,
          igv: 0,
          tipAfeIgv: 20,
          totalImpuestos: 0,
          mtoPrecioUnitario: 50,
        },
      ],
      legends: [
        {
          code: "1000",
          value: "SON TRESCIENTOS TREINTA Y SEIS CON OO/100 SOLES",
        },
      ],
    }),
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
  });
});
