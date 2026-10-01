/* Kami's Pet Groomer — brand data. Edit prices/text here; the rest of the site reads from this file. */
(function () {
  "use strict";

  window.__BRAND__ = {
    name: "Kami's Pet Groomer",
    groomer: "Kamila (Lluvia) Véliz",
    tagline: "Cuidado experto, resultados que se notan.",
    heroQuote: "Si estás buscando un lugar donde realmente cuiden de tu mascota, déjame enseñarte cómo puedo ayudarte.",
    heroSub: "Grooming profesional con más de 3 años de experiencia en Dania Beach, FL.",

    contact: {
      address: "Woof Gang Bakery & Grooming Dania Beach, 1778 Pointe Blvd, Dania Beach, FL 33004",
      email: "lluviakamila@gmail.com",
      phone: "(754) 269-1618",
      phoneHref: "+17542691618",
      instagram: "https://www.instagram.com/kamispetgroomer_/",
      tiktok: "https://www.tiktok.com/@kamispetgroomer_",
      mapsEmbed: "https://www.google.com/maps?q=Woof+Gang+Bakery+%26+Grooming+Dania+Beach,+1778+Pointe+Blvd,+Dania+Beach,+FL+33004&output=embed",
      mapsLink: "https://www.google.com/maps/search/?api=1&query=Woof+Gang+Bakery+%26+Grooming+Dania+Beach,+1778+Pointe+Blvd,+Dania+Beach,+FL+33004"
    },

    hours: [
      { days: "Miércoles – Sábado", time: "9:00am – 5:00pm" },
      { days: "Domingo", time: "10:00am – 4:00pm" },
      { days: "Lunes – Martes", time: "Cerrado" }
    ],

    // El botón "Agendar cita" abre un formulario corto (nombre, apellido, mascota,
    // teléfono) y luego dirige aquí para elegir día/hora en el sistema oficial de
    // Woof Gang Bakery. El cliente debe seleccionar "Lluvia Véliz" como groomer.
    bookingUrl: "https://shop.woofgangbakery.com/202733/booking",

    // Cada envío del formulario "Agendar cita" se manda calladamente a este Google
    // Form (el visitante nunca lo ve) — cae como fila nueva en el Google Sheet
    // conectado a ese Form. Para cambiar a otro Form: reemplaza `action` por
    // "<url-del-form>/formResponse" y los `entry.NNNN` por los del nuevo Form
    // (Enviar → ⋮ → "Obtener vínculo con respuestas completadas").
    googleForm: {
      action: "https://docs.google.com/forms/d/e/1FAIpQLSe55ovkLHipBqNaDYnWAL1ANeR49ivmeZ04fkK64ajIWXJSnA/formResponse",
      entries: {
        firstName: "entry.1384086756",
        lastName: "entry.1465370942",
        petName: "entry.320361946",
        phone: "entry.2102481329"
      }
    },

    languages: ["Español", "English"],

    bio: "Soy una apasionada amante de los perros, con un profundo conocimiento en el manejo y control de animales. Mi especialización en la técnica de corte con tijera me permite ofrecer un servicio de grooming de alta calidad, cuidando siempre el bienestar y la comodidad de cada mascota que atiendo.",

    experience: [
      { place: "Woof Gang Pembroke Pines", role: "Groomer", period: "Junio 2024 – Septiembre 2025" },
      { place: "For Paws Only Inc", role: "Groomer", period: "Octubre 2022 – Mayo 2024" },
      { place: "Mobile Pet Grooming Honey Pets", role: "Groomer móvil", period: "Octubre 2022 – Mayo 2024" }
    ],

    breeds: [
      { name: "Pomeranians", level: 100 },
      { name: "Doodles", level: 95 },
      { name: "Schnauzers", level: 90 },
      { name: "Goldens", level: 80 },
      { name: "Samoyedo", level: 90 }
    ],

    // La matriz de precios (Baño / Mini Groom / Full Groom × tamaño) y el precio
    // de gatos viven directamente en la sección #servicios en index.html — edítalos ahí.

    // La sección #galeria ahora es una cuadrícula de 16 parejas "antes/después"
    // (placeholders en index.html) — se va llenando ahí directamente con fotos reales.

    testimonials: [
      { quote: "Thank you so much for the wonderful haircut! My fur baby looks adorable. You did an amazing job, and we love the new look! We truly appreciate your care and attention.", author: "Cliente vía Instagram" },
      { quote: "Creo que Kira encontró su grooming favorita. Gracias por consentirla.", author: "Dueña de Kira · @kira_toyaussie" },
      { quote: "Muchas gracias a ti por todo, de verdad, valió la pena la hora de manejo, estoy muy feliz porque aparte de que quedó preciosa sé que la cuidaste bien, y para mí eso es más importante.", author: "Cliente vía WhatsApp" }
    ]
  };
})();
