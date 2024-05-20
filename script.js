$(() => {
  $(".button").on("click", function(event) {
    event.preventDefault();

    const parent = $(this).parents(".step");
    const currentStep = $(parent).data("step");

    if (currentStep < 3) {
      const nextStep = currentStep + 1;
      $(parent).css("display", "none");
      $(".step-" + nextStep).css("display", "flex");

      if (currentStep === 1) {
        $('#circle-loader').circleProgress({
          value: 1,
          // size: 124,
          startAngle: -Math.PI / 2,
          thickness: 10,
          fill: {
              color: '#FC7C3C'
          },
          emptyFill: 'rgba(252, 124, 60, 0.1)',
          animation: {
              duration: 5000,
              easing: 'circleProgressEasing'
          }
        }).on('circle-animation-progress', function(event, progress) {
          let percentagesProgress = Math.round(100 * progress);
          $(this).find('strong').html(percentagesProgress + '<i>%</i>');
          switch (percentagesProgress) {
            case 25:
              $(".results__result:nth-child(1) .results__check-icon").removeClass("icon--not-checked").addClass("icon--checked");
              $(".results__result:nth-child(2)").css("display", "flex");
              break;
            case 50:
              $(".results__result:nth-child(2) .results__check-icon").removeClass("icon--not-checked").addClass("icon--checked");
              $(".results__result:nth-child(3)").css("display", "flex");
              break;
            case 75:
              $(".results__result:nth-child(3) .results__check-icon").removeClass("icon--not-checked").addClass("icon--checked");
              break;
            case 100:
              $(".step-2__button").css("display", "block");
              break;
            default:
              break;
          }
        });
      }

      if (currentStep === 2) {
        $(".section__text").css("display", "block");
      }
    }

    if (currentStep === 3) {
      window.location.href = "sms:+1234?body=TEST";
    }
  });

  function checkFormValidity() {
    const day = $("#day-dropdown").val();
    const month = $("#month-dropdown").val();
    const year = $("#year-dropdown").val();
    const birthplace = $(".step-1__birthplace-input").val();
    const checkboxChecked = $(".step-1__checkbox").is(":checked");

    const isValidBirthdate = day && month && year;
    const isValidBirthplace = birthplace || checkboxChecked;

    $(".step-1__button").prop("disabled", !(isValidBirthdate && isValidBirthplace));
  }

  $("#day-dropdown, #month-dropdown, #year-dropdown, .step-1__birthplace-input, .step-1__checkbox").on("change input", checkFormValidity);

  $(".step-1__checkbox").on("change", function() {
    const inputField = $(".step-1__birthplace-input");
    if ($(this).is(":checked")) {
      $(this).removeClass("icon--not-checked").addClass("icon--checked");
      inputField.val("");
      inputField.prop("disabled", true);
    } else {
      $(this).removeClass("icon--checked").addClass("icon--not-checked");
      inputField.prop("disabled", false);
    }
    checkFormValidity();
  });

  $(".step-1__birthplace-input").on("input", function() {
    const checkbox = $(".step-1__checkbox");
    if ($(this).val().trim() !== "") {
      checkbox.prop("checked", false);
    }
    checkFormValidity();
  });

  function setMonthsAndYears() {
    for (let i = 1; i <= 12; i++) {
      $("#month-dropdown").append(`<option value="${i}">${i}</option>`);
    }

    const currentYear = new Date().getFullYear();
    const yearsToAdd = 30;
    for (let i = 0; i <= yearsToAdd; i++) {
      $("#year-dropdown").append(`<option value="${currentYear - i}">${currentYear - i}</option>`);
    }
  }

  setMonthsAndYears();
});

document.addEventListener("DOMContentLoaded", function() {
  const dropdown = document.getElementById("day-dropdown");

  for (let i = 1; i <= 31; i++) {
      const option = document.createElement("option");
      option.value = i;
      option.className = "step-1__dropbox-item";
      option.textContent = i;
      dropdown.appendChild(option);
  }
});
