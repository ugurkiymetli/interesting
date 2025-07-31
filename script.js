function formatCurrency(number) {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);
}

function parseCurrency(value) {
  return parseFloat(value.replace(/[^\d]/g, ''));
}

function calculateInterest() {
  const principal = parseCurrency(document.getElementById('principal').value);
  const rate = parseFloat(document.getElementById('rate').value);
  const time = parseInt(document.getElementById('time').value);
  const taxPercantage = 15; // Türkiye'de stopaj oranı %15

  if (principal > 0 && !isNaN(rate) && !isNaN(time)) {
    const interest = (principal * rate * time) / 36500;
    const taxReduction = interest * (taxPercantage / 100);
    const netInterest = interest - taxReduction;
    const finalAmount = principal + netInterest;

    document.getElementById('result').innerHTML = `
            <span class="main-result">
             <span class="net-income">Net Kazanç: ${formatCurrency(
               netInterest
             )}</span>   
            Tahmini Vade Sonu Getiri: ${formatCurrency(finalAmount)}
            </span>
            <ul class="details">
                <li><strong>Ana Para:</strong> ${formatCurrency(principal)}</li>
                <li><strong>Brüt Faiz:</strong> ${formatCurrency(interest)}</li>
                <li><strong>Tahmini Stopaj (${taxPercantage}%):</strong> ${formatCurrency(
      taxReduction
    )} </li>
            </ul>
        `;
  } else {
    document.getElementById('result').textContent = '';
  }
}

function formatPrincipalInput() {
  const input = document.getElementById('principal');
  const cursorPosition = input.selectionStart;
  const originalLength = input.value.length;

  let value = parseCurrency(input.value);
  if (!isNaN(value)) {
    input.value = formatCurrency(value);
  }

  const newLength = input.value.length;
  input.setSelectionRange(
    cursorPosition + (newLength - originalLength),
    cursorPosition + (newLength - originalLength)
  );
}

// Set default values
document.getElementById('principal').value = formatCurrency(100_000);
document.getElementById('time').value = 32;
document.getElementById('rate').value = 50;

// Tüm input alanlarına event listener ekle
document
  .getElementById('principal')
  .addEventListener('input', formatPrincipalInput);
document
  .getElementById('principal')
  .addEventListener('blur', calculateInterest);
document.getElementById('rate').addEventListener('input', calculateInterest);
document.getElementById('time').addEventListener('input', calculateInterest);

// İlk hesaplama
calculateInterest();
