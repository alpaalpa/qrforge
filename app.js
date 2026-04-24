/* global QRCode */

(function () {
    'use strict';

    var inputEl       = document.getElementById('qr-input');
    var sizeEl        = document.getElementById('qr-size');
    var eclEl         = document.getElementById('qr-ecl');
    var generateBtn   = document.getElementById('generate-btn');
    var outputSection = document.getElementById('output-section');
    var qrcodeEl      = document.getElementById('qrcode');
    var downloadBtn   = document.getElementById('download-btn');

    var qrInstance = null;

    function removeError() {
        var existing = document.querySelector('.error-msg');
        if (existing) {
            existing.remove();
        }
    }

    function showError(msg) {
        removeError();
        var err = document.createElement('p');
        err.className = 'error-msg';
        err.textContent = msg;
        inputEl.insertAdjacentElement('afterend', err);
    }

    function generate() {
        removeError();

        var text = inputEl.value.trim();
        if (!text) {
            showError('Please enter a URL or text to encode.');
            return;
        }

        var size = parseInt(sizeEl.value, 10);
        var ecl  = eclEl.value;          // 'L' | 'M' | 'Q' | 'H'

        // Map letter to QRCode.CorrectLevel constant
        var levelMap = {
            L: QRCode.CorrectLevel.L,
            M: QRCode.CorrectLevel.M,
            Q: QRCode.CorrectLevel.Q,
            H: QRCode.CorrectLevel.H
        };

        // Clear previous QR code
        qrcodeEl.innerHTML = '';
        outputSection.classList.add('hidden');

        try {
            qrInstance = new QRCode(qrcodeEl, {
                text:           text,
                width:          size,
                height:         size,
                colorDark:      '#000000',
                colorLight:     '#ffffff',
                correctLevel:   levelMap[ecl]
            });
        } catch (err) {
            showError('Could not generate QR code – the input text may be too long for the selected error correction level.');
            return;
        }

        outputSection.classList.remove('hidden');
    }

    function getCanvas() {
        return qrcodeEl.querySelector('canvas');
    }

    function download() {
        var canvas = getCanvas();
        if (!canvas) {
            // qrcodejs fell back to an <img> tag (some older browsers)
            var img = qrcodeEl.querySelector('img');
            if (img) {
                var link = document.createElement('a');
                link.href = img.src;
                link.download = 'qrcode.png';
                link.click();
            }
            return;
        }

        canvas.toBlob(function (blob) {
            var url  = URL.createObjectURL(blob);
            var link = document.createElement('a');
            link.href     = url;
            link.download = 'qrcode.png';
            link.click();
            URL.revokeObjectURL(url);
        }, 'image/png');
    }

    // Generate on button click
    generateBtn.addEventListener('click', generate);

    // Generate on Enter key in the input field
    inputEl.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            generate();
        }
    });

    // Download button
    downloadBtn.addEventListener('click', download);
}());
