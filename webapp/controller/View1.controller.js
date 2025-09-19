sap.ui.define([
    "sap/ui/core/mvc/Controller",
     "sap/m/MessageToast" 
], (Controller,MessageToast) => {
    "use strict";

    return Controller.extend("test7.project7.controller.View1", {
        onInit() {
        },
         onScanPress: function () {
            const container = this.byId("barcodeContainer").getDomRef();
            const inputField = this.byId("materialInput");
            const that = this;

            if (!window.Quagga) {
                MessageToast.show("QuaggaJS is not loaded.");
                return;
            }

            let scanned = false; // flag to track if barcode is detected

            // Show the camera container
            container.style.display = "block";

            Quagga.init({
    inputStream: {
        name: "Live",
        type: "LiveStream",
        target: container,
        constraints: {
            facingMode: "environment",
            width: { min: 640, ideal: 1280 },
            height: { min: 480, ideal: 720 }
        }
    },
    decoder: {
        readers: [
            "code_128_reader",
            "ean_reader",
            "ean_8_reader",
            "upc_reader",
            "upc_e_reader",
            "code_39_reader",
            "code_39_vin_reader",
            "codabar_reader",
            "i2of5_reader"
        ]
    }
}, function(err) {
    if (err) {
        console.error(err);
        sap.m.MessageToast.show("Error initializing scanner: " + err);
        return;
    }
    Quagga.start();

    setTimeout(function () {
                    if (!scanned) {
                        MessageToast.show("Value is not scanned.");
                        container.style.display = "none";
                        Quagga.stop();
                    }
                }, 50000);
});

            // // Initialize Quagga
            // Quagga.init({
            //     inputStream: {
            //         name: "Live",
            //         type: "LiveStream",
            //         target: container,
            //         constraints: { facingMode: "environment" } // back camera
            //     },
            //     decoder: {
            //         readers: ["code_128_reader", "ean_reader", "upc_reader"]
            //     }
            // }, function (err) {
            //     if (err) {
            //         console.error(err);
            //         MessageToast.show("Error initializing scanner: " + err);
            //         return;
            //     }
            //     Quagga.start();

            //     // Stop scanning automatically after 5 seconds if nothing is detected
                
            // });

            // Handle detected barcode
            Quagga.onDetected(function (data) {
                scanned = true;
                const code = data.codeResult.code;

                // Hide camera
                container.style.display = "none";

                // Insert scanned value
                inputField.setValue(code);

                MessageToast.show("Scanned: " + code);
                Quagga.stop();
            });
        }

    });
});