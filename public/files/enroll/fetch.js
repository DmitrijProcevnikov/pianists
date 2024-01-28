let text = "";
let token = "";
let chat_id = "";
const okMessage = document.querySelector(".ok-message");
const errMessage = document.querySelector(".err-message");
const logForm = document.querySelector(".log-form");
const applicantForm = document.getElementById("mars-once");
applicantForm.addEventListener("submit", handleFormSubmit);

function onSuccess() {
  logForm.style.display = "none";
  okMessage.style.display = "block";
}

function errSuccess() {
  logForm.style.display = "none";
  errMessage.style.display = "block";
}

function serializeForm(formNode) {
  const { elements } = formNode;

  const data = new FormData();

  Array.from(elements)
    .filter((item) => !!item.name)
    .forEach((element) => {
      const { name, type } = element;
      const value = type === "checkbox" ? element.checked : element.value;

      data.append(name, value);
      text += `${name}: -- ${value} %0A`;
    });
  console.log(text);
}

async function sendData(data) {
  await fetch("/getVariables")
    .then((response) => response.json())
    .then((data) => {
      token = data.token;
      chat_id = data.chat_id;
    });

  return await fetch(
    `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&parse_mode=html&text=${text}`,
    {
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      body: data,
    }
  );
}

async function handleFormSubmit(event) {
  event.preventDefault();
  const data = serializeForm(event.target);
  const { status, error } = await sendData(data);
  if (status === 200) {
    onSuccess();
  } else {
    errSuccess();
  }
}
