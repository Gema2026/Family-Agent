function formatDate(date) {
  return date.toLocaleDateString("es-ES", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
}

function addDays(date, days) {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
}

function calculateWeeks() {
  const input = document.getElementById("birthDate");
  const result = document.getElementById("plannerResult");

  if (!input.value) {
    result.innerHTML = "<strong>Falta la fecha 👀</strong><p>Introduce una fecha de nacimiento prevista o real para calcular el primer bloque obligatorio.</p>";
    result.classList.remove("hidden");
    return;
  }

  const birth = new Date(input.value + "T12:00:00");
  const week1End = addDays(birth, 6);
  const mandatoryEnd = addDays(birth, 41);
  const firstBirthday = new Date(birth);
  firstBirthday.setFullYear(firstBirthday.getFullYear() + 1);
  const eighthBirthday = new Date(birth);
  eighthBirthday.setFullYear(eighthBirthday.getFullYear() + 8);

  result.innerHTML = `
    <strong>Tu mapa inicial 🗓️</strong>
    <p><b>Semana 1:</b> del ${formatDate(birth)} al ${formatDate(week1End)}.</p>
    <p><b>6 semanas obligatorias:</b> del ${formatDate(birth)} al ${formatDate(mandatoryEnd)}.</p>
    <p><b>11 semanas voluntarias:</b> podrás disfrutarlas, por semanas, hasta el ${formatDate(firstBirthday)}.</p>
    <p><b>2 semanas adicionales legales:</b> podrás disfrutarlas, por semanas, hasta el ${formatDate(eighthBirthday)}.</p>
    <p><b>Recuerda:</b> preavisa con 15 días para los periodos semanales posteriores.</p>
  `;
  result.classList.remove("hidden");
}

function showSituation(type) {
  const box = document.getElementById("situationResult");
  const content = {
    nacimiento: {
      title: "👶 Acaba de nacer mi bebé",
      text: "Envía a People un documento del hospital que certifique el nacimiento y la solicitud de disfrute del permiso cumplimentada y firmada. Cuando tengas el certificado del Registro Civil, envíalo también."
    },
    semanas: {
      title: "🗓️ Quiero organizar mis semanas",
      text: "Las 6 primeras semanas son obligatorias e inmediatas. Las 11 semanas voluntarias pueden disfrutarse de forma continuada o interrumpida hasta los 12 meses. Las 2 adicionales legales pueden disfrutarse hasta los 8 años."
    },
    pagos: {
      title: "💸 Quiero saber quién me paga",
      text: "Durante el permiso por nacimiento, la prestación la abona el INSS. People te facilitará el certificado de empresa para solicitarla. Durante la lactancia, no interviene el INSS: es un permiso retribuido por la empresa."
    },
    lactancia: {
      title: "🍼 Quiero pedir lactancia",
      text: "Puedes solicitar la lactancia acumulada en 15 días laborables o disfrutarla de forma diaria hasta que el bebé cumpla 9 meses. Coordina la forma de disfrute con People."
    },
    seguro: {
      title: "🎁 Quiero ver Baby Benefits",
      text: "En Baby Benefits encontrarás el Baby Basket, el alta del bebé en el seguro de salud, la retribución flexible de Cobee para guardería y el modelo 145 para actualizar tu situación familiar."
    },
    vuelta: {
      title: "🌱 Estoy preparando la vuelta",
      text: "Si tienes vacaciones pendientes o quieres organizar tu reincorporación, coordínalo con tu manager y People para revisar fechas, lactancia y cualquier necesidad de acompañamiento."
    }
  };

  const item = content[type];
  box.innerHTML = `<h3>${item.title}</h3><p>${item.text}</p>`;
  box.classList.remove("hidden");
  box.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function copyEmailTemplate() {
  const template = document.getElementById("emailTemplate");
  const status = document.getElementById("copyStatus");
  template.select();
  template.setSelectionRange(0, 99999);

  navigator.clipboard.writeText(template.value).then(() => {
    status.textContent = "Plantilla copiada al portapapeles.";
  }).catch(() => {
    status.textContent = "No se pudo copiar automáticamente. Puedes seleccionarla y copiarla manualmente.";
  });
}
