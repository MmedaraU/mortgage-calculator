/*=================== Variables ===================*/
const emptyResults = document.getElementById('empty-results');
const completedResults = document.getElementById('completed-results');



document.querySelectorAll('mortgage-type').forEach(input => {
  input.addEventListener('change'), function () {
    document.querySelectorAll('.radio-input').forEach(div => {
      div.classList.remove('selected')
    })
    if (this.checked) {
      this.parentElement.classList.add('selected')
    }
  }
})


/*=================== Setting Default Styles ===================*/
/*=================== Event Listeners ===================*/
/*=================== Setting Default Values ===================*/


/*=================== Functions ===================*/

document.getElementById('btn-calc').addEventListener('click', () => {
  const mortgageAmount = parseFloat(document.getElementById('mortgage-amount').value);
  const mortgageTerm = parseFloat(document.getElementById('mortgage-term').value);
  const interestRate = parseFloat(document.getElementById('interest-rate').value) / 100;
  const mortgageType = document.querySelector('input[name="mortgage-type"]:checked');

  let isValid = true;

  document.querySelectorAll('.main-form-input').forEach(el => {
    el.classList.remove(".error")
  })

  if (isNaN(mortgageAmount) || mortgageAmount <= 0) {
    document.getElementById('amount-alert').style.display = 'block';
    document.getElementById('mortgage-amount-main').classList.add('.error')
    isValid = false;
  } else {
    document.getElementById('amount-alert').style.visibility = 'hidden';
  }

  if (isNaN(mortgageTerm) || mortgageTerm <= 0) {
    document.getElementById('term-alert').style.display = 'block';
    document.getElementById('mortgage-term-main').classList.add('.error')
    isValid = false;
  } else {
    document.getElementById('term-alert').style.visibility = 'hidden';
  }

  if (isNaN(interestRate) || interestRate <= 0) {
    document.getElementById('rate-alert').style.display = 'block';
    document.getElementById('interest-rate-main').classList.add('.error')
    isValid = false;
  } else {
    document.getElementById('rate-alert').style.visibility = 'hidden';
  }

  if (!mortgageType) {
    document.getElementById('type-alert').style.display = "block";
    document.querySelectorAll(".radio-input").forEach(el => {
      el.classList.add('error')
    })
    isValid = false
  } else {
    document.getElementById('type-alert').style.visibility = "hidden";
    document.querySelectorAll('.radio-input').forEach(el => {
      el.classList.remove('error')
    })
  }

  if (isValid) {
    let monthlyPayment = 0;
    let totalPayment = 0;

    emptyResults.classList.add('hide');
    completedResults.classList.add('show');

    if (mortgageType.value === 'repayment') {
      const monthlyRate = interestRate / 12;
      const n = mortgageTerm * 12;
      monthlyPayment = (mortgageAmount * monthlyRate) / (1 - Math.pow((1 + monthlyRate), -n))
      totalPayment = monthlyPayment * n
    } else if (mortgageType.value === 'interest-only') {
      monthlyPayment = (mortgageAmount * interestRate) / 12
      totalPayment = monthlyPayment * mortgageTerm * 12
    }
    document.getElementById('monthly-total').innerText = `₦${monthlyPayment.toFixed(2)}`
    document.getElementById('term-total').innerText = `₦${totalPayment.toFixed(2)}`
  } else {
    document.getElementById('monthly-total').innerText = "₦0.00"
    document.getElementById('term-total').innerText = "₦0.00"

    emptyResults.classList.remove('hide');
    completedResults.classList.remove('show');
  }

})

document.getElementById('btn-clear').addEventListener('click', () => {
  document.getElementById('mortgage-form').reset()
  document.getElementById('monthly-total').innerText = "₦0.00"
  document.getElementById('term-total').innerText = "₦0.00"
  document.querySelectorAll(".form-alert").forEach(el => {
    el.style.display = 'none'
  })

  emptyResults.classList.remove('hide');
  completedResults.classList.remove('show');


  document.querySelectorAll('.radio-inputs'), forEach(div => {
    div.classList.remove('error')
  })

  document.querySelectorAll('.main-form-input').forEach(el => {
    el.classList.remove('error')
  })

  document.querySelectorAll('.form-alert').forEach(alert => {
    alert.style.display = 'none'
  })
})
