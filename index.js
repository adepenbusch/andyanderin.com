window.onload = function () {
  const rsvpButton = document.querySelector(".hoverButton");
  const rsvpModal = document.querySelector(".rsvpModal");
  const rsvpModalClose = document.querySelector(".rsvpModalClose");
  const rsvpModalSubmit = document.querySelector(".rsvpModalSubmit");
  const rsvp = document.querySelector("#rsvp");

  // Open modal on click
  rsvpButton.addEventListener("click", () => {
    rsvpModal.style.display = "block";
  });

  // Close modal on close click
  rsvpModalClose.addEventListener("click", () => {
    rsvpModal.style.display = "none";
  });

  // Close modal on submit click
  rsvpModalSubmit.addEventListener("click", () => {
    rsvpModal.style.display = "none";
  });

  rsvp.addEventListener("submit", (event) => {
    console.log("made it!");
    event.preventDefault();
    submitRsvp();
  });
};

const submitRsvp = () => {
  const toast = document.getElementById("toast");
  const form = document.forms.rsvp;
  const formData = new FormData(form);
  const url = `https://6gqqmxziwcgub7wyypt423mzui0ssrow.lambda-url.us-east-1.on.aws/?first_name_p1=${formData.get(
    "first_name_p1"
  )}&last_name_p1=${formData.get("last_name_p1")}&first_name_p2=${formData.get(
    "first_name_p2"
  )}&last_name_p2=${formData.get("last_name_p2")}&email=${formData.get(
    "email"
  )}&address=${formData.get("address")}&rsvp_status=${formData.get(
    "rsvp_status"
  )}`;
  fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.blob();
  });

  toast.querySelector(".toast-body").innerHTML = "Thanks for RSVPing!";
  toast.classList.add("visible");

  window.setTimeout(() => {
    toast.classList.remove("visible");
  }, 3000);
};
