function getCurrentLang() {
  return document.documentElement.lang === "en" ? "en" : "es";
}

const copy = {
  es: {
    locale: "es-ES",
    missingDateTitle: "Falta la fecha 👀",
    missingDateText: "Introduce una fecha de nacimiento prevista o real para calcular el primer bloque obligatorio.",
    mapTitle: "Tu mapa inicial 🗓️",
    week1: "Semana 1",
    mandatory: "6 semanas obligatorias",
    voluntary11: "11 semanas voluntarias",
    additional2: "2 semanas adicionales legales",
    from: "del",
    to: "al",
    canEnjoyUntil: "podrás disfrutarlas, por semanas, hasta el",
    remember: "Recuerda",
    notice: "preavisa con 15 días para los periodos semanales posteriores.",
    copied: "Plantilla copiada al portapapeles.",
    copyError: "No se pudo copiar automáticamente. Puedes seleccionarla y copiarla manualmente.",
    situations: {
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
      especiales: {
        title: "👶👶 Mi caso es especial",
        text: "Si se trata de una familia monoparental, adopción, guarda con fines de adopción, acogimiento o nacimiento/adopción múltiple, revisaremos contigo el cálculo y la documentación específica. La calculadora es orientativa para el caso general."
      },
      vuelta: {
        title: "🌱 Estoy preparando la vuelta",
        text: "Si tienes vacaciones pendientes o quieres organizar tu reincorporación, coordínalo con tu manager y People para revisar fechas, lactancia y cualquier necesidad de acompañamiento."
      }
    }
  },
  en: {
    locale: "en-GB",
    missingDateTitle: "Date missing 👀",
    missingDateText: "Enter an expected or actual birth date to calculate the first mandatory block.",
    mapTitle: "Your initial roadmap 🗓️",
    week1: "Week 1",
    mandatory: "6 mandatory weeks",
    voluntary11: "11 voluntary weeks",
    additional2: "2 additional legal weeks",
    from: "from",
    to: "to",
    canEnjoyUntil: "you can take them, by weeks, until",
    remember: "Remember",
    notice: "give 15 days’ notice for later weekly periods.",
    copied: "Template copied to the clipboard.",
    copyError: "Automatic copy failed. You can select it and copy it manually.",
    situations: {
      nacimiento: {
        title: "👶 My baby has just been born",
        text: "Send People a hospital document certifying the birth and the completed and signed leave request form. When you have the Civil Registry certificate, send it too."
      },
      semanas: {
        title: "🗓️ I want to organise my weeks",
        text: "The first 6 weeks are mandatory and immediate. The 11 voluntary weeks can be taken continuously or split until the baby turns 12 months old. The 2 additional legal weeks can be taken until the child turns 8."
      },
      pagos: {
        title: "💸 I want to know who pays me",
        text: "During birth leave, the benefit is paid by the INSS. People will provide the company certificate so you can apply for it. During breastfeeding leave, the INSS does not intervene: it is paid by the company."
      },
      lactancia: {
        title: "🍼 I want to request breastfeeding leave",
        text: "You can request breastfeeding leave as 15 working days in one block or take it daily until the baby turns 9 months old. Coordinate how you want to take it with People."
      },
      seguro: {
        title: "🎁 I want to see Baby Benefits",
        text: "In Baby Benefits you will find the Baby Basket, adding the baby to health insurance, Cobee flexible compensation for nursery expenses and Modelo 145 to update your family situation."
      },
      especiales: {
        title: "👶👶 My case is special",
        text: "If this is a single-parent family, adoption, guardianship for adoption, foster care or multiple birth/adoption, we will review the specific calculation and documentation with you. The planner is only an orientation for the standard case."
      },
      vuelta: {
        title: "🌱 I am preparing my return",
        text: "If you have pending holidays or want to organise your return, coordinate it with your manager and People to review dates, breastfeeding leave and any support you may need."
      }
    }
  }
};

function formatDate(date) {
  return date.toLocaleDateString(copy[getCurrentLang()].locale, {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
}

function addDays(date, days) {
  const copyDate = new Date(date);
  copyDate.setDate(copyDate.getDate() + days);
  return copyDate;
}

function calculateWeeks() {
  const lang = copy[getCurrentLang()];
  const input = document.getElementById("birthDate");
  const result = document.getElementById("plannerResult");

  if (!input.value) {
    result.innerHTML = `<strong>${lang.missingDateTitle}</strong><p>${lang.missingDateText}</p>`;
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
    <strong>${lang.mapTitle}</strong>
    <p><b>${lang.week1}:</b> ${lang.from} ${formatDate(birth)} ${lang.to} ${formatDate(week1End)}.</p>
    <p><b>${lang.mandatory}:</b> ${lang.from} ${formatDate(birth)} ${lang.to} ${formatDate(mandatoryEnd)}.</p>
    <p><b>${lang.voluntary11}:</b> ${lang.canEnjoyUntil} ${formatDate(firstBirthday)}.</p>
    <p><b>${lang.additional2}:</b> ${lang.canEnjoyUntil} ${formatDate(eighthBirthday)}.</p>
    <p><b>${lang.remember}:</b> ${lang.notice}</p>
  `;
  result.classList.remove("hidden");
}

function showSituation(type) {
  const box = document.getElementById("situationResult");
  const item = copy[getCurrentLang()].situations[type];
  box.innerHTML = `<h3>${item.title}</h3><p>${item.text}</p>`;
  box.classList.remove("hidden");
  box.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function copyEmailTemplate() {
  const template = document.getElementById("emailTemplate");
  const status = document.getElementById("copyStatus");
  const lang = copy[getCurrentLang()];
  template.select();
  template.setSelectionRange(0, 99999);

  navigator.clipboard.writeText(template.value).then(() => {
    status.textContent = lang.copied;
  }).catch(() => {
    status.textContent = lang.copyError;
  });
}
