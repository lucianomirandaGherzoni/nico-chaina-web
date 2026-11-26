'use strict';

// Reemplazar por el número real de Nico en formato internacional, sin "+" ni espacios (ej. 5493511234567).
const TELEFONO_WHATSAPP = '549XXXXXXXXXX';

const RUEDA = {
  norte: { dir: 'Norte', animal: 'Colibrí', rito: 'Recuperación de Alma', texto: '[Explicación de Nico sobre Recuperación de Alma]' },
  este: { dir: 'Este', animal: 'Cóndor', rito: 'Rito de Muerte', texto: '[Explicación de Nico sobre el Rito de Muerte]' },
  sur: { dir: 'Sur', animal: 'Serpiente', rito: 'Combustión de Hucha', texto: '[Explicación de Nico sobre la Combustión de Hucha]' },
  oeste: { dir: 'Oeste', animal: 'Jaguar', rito: 'Corte de Cordones', texto: '[Explicación de Nico sobre el Corte de Cordones]' }
};
const ORDEN_RUEDA = ['sur', 'oeste', 'norte', 'este'];

const PASOS = [
  { clave: 'terapia', etiqueta: 'Terapia', pregunta: '¿Qué terapia te interesa?', opciones: ['Terapia Corporal Bioenergética', 'Reiki', 'Terapia Floral', 'Barras de Access', 'Chamanismo Evolutivo', 'No sé, quiero que me orientes'] },
  { clave: 'modalidad', etiqueta: 'Modalidad', pregunta: '¿Cómo preferís hacer la sesión?', opciones: ['Presencial en Córdoba', 'Online'] },
  { clave: 'motivo', etiqueta: 'Motivo', pregunta: '¿Qué te trae a consultar?', opciones: ['Estrés o ansiedad', 'Bloqueos emocionales', 'Cansancio o energía baja', 'Proceso espiritual / autoconocimiento', 'Otro motivo'] },
  { clave: 'horario', etiqueta: 'Horario', pregunta: '¿Qué horario te queda mejor?', opciones: ['Mañana', 'Tarde', 'Noche', 'Me adapto'] }
];
const TOTAL_PASOS = PASOS.length + 1;
const CLAVE_RESUMEN = { terapia: 'therapy', modalidad: 'mode', motivo: 'reason', horario: 'time' };

const enlaceWhatsapp = (mensaje) =>
  'https://wa.me/' + TELEFONO_WHATSAPP.replace(/\D/g, '') + (mensaje ? '?text=' + encodeURIComponent(mensaje) : '');

function iniciarMenu() {
  const boton = document.querySelector('.menu-boton');
  const menu = document.getElementById('menu-principal');
  if (!boton || !menu) return;

  const cerrar = (devolverFoco) => {
    menu.classList.remove('esta-abierto');
    boton.setAttribute('aria-expanded', 'false');
    boton.setAttribute('aria-label', 'Abrir menú');
    if (devolverFoco) boton.focus();
  };

  boton.addEventListener('click', () => {
    const abrir = !menu.classList.contains('esta-abierto');
    menu.classList.toggle('esta-abierto', abrir);
    boton.setAttribute('aria-expanded', String(abrir));
    boton.setAttribute('aria-label', abrir ? 'Cerrar menú' : 'Abrir menú');
    if (abrir) menu.querySelector('a:not(.menu__solo-desktop)')?.focus();
  });
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) cerrar(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('esta-abierto')) cerrar(true);
  });
}

function iniciarEnlacesWhatsapp() {
  document.querySelectorAll('[data-whatsapp]').forEach((a) => { a.href = enlaceWhatsapp(); });
}

function iniciarOnda() {
  const onda = document.querySelector('.onda');
  if (!onda) return;
  if (!('IntersectionObserver' in window)) { onda.classList.add('es-visible'); return; }
  const observador = new IntersectionObserver((entradas) => {
    if (entradas.some((e) => e.isIntersecting)) {
      onda.classList.add('es-visible');
      observador.disconnect();
    }
  }, { threshold: 0.4 });
  observador.observe(onda);
}

const GRUPOS_REVELAR = [
  { selector: '.hero__texto > *', escalonar: true },
  { selector: '.sobre__titulo-mobile' },
  { selector: '.sobre__foto', variante: 'foto' },
  { selector: '.sobre__texto > *', escalonar: true },
  { selector: '.instagram__encabezado' },
  { selector: '.instagram__grilla li', escalonar: true, variante: 'foto' },
  { selector: '.instagram__caja > .enlace-flecha' },
  { selector: '.espacio__foto', variante: 'izquierda' },
  { selector: '.espacio__tarjeta', variante: 'derecha', retraso: 120 },
  { selector: '.terapias .titulo' },
  { selector: '.terapia__medio', variante: 'foto' },
  { selector: '.terapia__texto', retraso: 150 },
  { selector: '.rueda__encabezado' },
  { selector: '.rueda__circulo', variante: 'foto' },
  { selector: '.rueda__panel-caja', retraso: 150 },
  { selector: '.rueda__cierre' },
  { selector: '.testimonios__caja > :not(.testimonios__videos)', escalonar: true },
  { selector: '.testimonio-video', escalonar: true, variante: 'foto' },
  { selector: '.reservar__intro' },
  { selector: '.formulario', retraso: 120 },
  { selector: '.cierre__texto > *', escalonar: true },
  { selector: '.pie__fila' }
];
const PASO_ESCALONADO_MS = 110;

function iniciarRevelado() {
  const elementos = [];
  GRUPOS_REVELAR.forEach(({ selector, escalonar, variante, retraso = 0 }) => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add('revelar');
      if (variante) el.classList.add('revelar--' + variante);
      const total = retraso + (escalonar ? Math.min(i, 5) * PASO_ESCALONADO_MS : 0);
      if (total) el.style.setProperty('--retraso', total + 'ms');
      elementos.push(el);
    });
  });

  if (!('IntersectionObserver' in window)) {
    elementos.forEach((el) => el.classList.add('es-visible'));
    return;
  }
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('es-visible');
      observador.unobserve(e.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  elementos.forEach((el) => observador.observe(el));
}

function iniciarVideosVisibles() {
  const videos = document.querySelectorAll('video[data-reproducir-visible]');
  if (!videos.length || !('IntersectionObserver' in window)) return;
  const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)');
  const esDesktop = window.matchMedia('(min-width: 900px)').matches;

  videos.forEach((video) => {
    const src = esDesktop ? video.dataset.srcDesktop : video.dataset.srcMobile;
    if (src) video.src = src;
    video.addEventListener('playing', () => video.classList.add('esta-reproduciendo'), { once: true });
  });

  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach(({ target: video, isIntersecting }) => {
      if (isIntersecting && !sinMovimiento.matches) {
        video.play().catch(() => {});
      } else if (!video.paused) {
        video.pause();
      }
    });
  }, { threshold: 0.25 });
  videos.forEach((v) => observador.observe(v));
}

function reiniciarAnimacion(elemento) {
  elemento.classList.remove('es-nuevo');
  void elemento.offsetWidth;
  elemento.classList.add('es-nuevo');
}

function iniciarRueda() {
  const panel = document.getElementById('rueda-panel');
  if (!panel) return;
  const botones = document.querySelectorAll('.animal');
  const arcos = document.querySelectorAll('[data-arco]');
  const iconos = panel.querySelectorAll('[data-icono]');
  const campos = {
    dir: panel.querySelector('[data-campo="dir"]'),
    animal: panel.querySelector('[data-campo="animal"]'),
    rito: panel.querySelector('[data-campo="rito"]'),
    texto: panel.querySelector('[data-campo="texto"]')
  };
  let actual = 'sur';

  const mostrar = (clave) => {
    actual = clave;
    const datos = RUEDA[clave];
    botones.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.direccion === clave)));
    arcos.forEach((a) => a.classList.toggle('esta-activo', a.dataset.arco === clave));
    iconos.forEach((i) => { i.hidden = i.dataset.icono !== clave; });
    Object.keys(campos).forEach((k) => { campos[k].textContent = datos[k]; });
    reiniciarAnimacion(panel);
  };

  botones.forEach((b) => b.addEventListener('click', () => mostrar(b.dataset.direccion)));
  panel.querySelectorAll('[data-rueda-paso]').forEach((b) => b.addEventListener('click', () => {
    const indice = ORDEN_RUEDA.indexOf(actual);
    const largo = ORDEN_RUEDA.length;
    mostrar(ORDEN_RUEDA[(indice + Number(b.dataset.ruedaPaso) + largo) % largo]);
  }));

  arcos.forEach((a) => a.classList.toggle('esta-activo', a.dataset.arco === actual));
}

function iniciarFormulario() {
  const raiz = document.querySelector('.formulario');
  if (!raiz) return;
  const $ = (nombre) => raiz.querySelector('[data-form="' + nombre + '"]');
  const ui = {
    paso: $('paso'), etiqueta: $('etiqueta'), barra: $('barra'),
    eleccion: $('eleccion'), pregunta: $('pregunta'), opciones: $('opciones'),
    final: $('final'), preguntaFinal: $('pregunta-final'), enviar: $('enviar'), volver: $('volver')
  };
  const inputNombre = raiz.querySelector('#f-nombre');
  const estado = { paso: 0, respuestas: {} };

  const armarMensaje = () => {
    const r = estado.respuestas;
    const nombre = inputNombre.value.trim().replace(/\s+/g, ' ').slice(0, 60) || '[nombre]';
    return 'Hola Nico! Soy ' + nombre + '. Quiero consultar por un turno.\n'
      + '• Terapia: ' + (r.terapia || '-') + '\n'
      + '• Modalidad: ' + (r.modalidad || '-') + '\n'
      + '• Motivo: ' + (r.motivo || '-') + '\n'
      + '• Horario: ' + (r.horario || '-');
  };
  const actualizarEnlace = () => { ui.enviar.href = enlaceWhatsapp(armarMensaje()); };

  const render = (moverFoco) => {
    const pasoActual = PASOS[estado.paso];
    const esFinal = !pasoActual;
    ui.paso.textContent = 'Paso ' + (estado.paso + 1) + ' de ' + TOTAL_PASOS;
    ui.etiqueta.textContent = esFinal ? 'Tus datos' : pasoActual.etiqueta;
    ui.barra.style.width = ((estado.paso + 1) / TOTAL_PASOS * 100) + '%';
    ui.eleccion.hidden = esFinal;
    ui.final.hidden = !esFinal;
    ui.volver.hidden = estado.paso === 0;

    if (esFinal) {
      Object.entries(CLAVE_RESUMEN).forEach(([clave, atributo]) => {
        raiz.querySelector('[data-resumen="' + atributo + '"]').textContent = estado.respuestas[clave] || '-';
      });
      actualizarEnlace();
      if (moverFoco) inputNombre.focus();
      return;
    }

    ui.pregunta.textContent = pasoActual.pregunta;
    const botones = pasoActual.opciones.map((opcion) => {
      const boton = document.createElement('button');
      boton.type = 'button';
      boton.className = 'opcion';
      boton.textContent = opcion;
      boton.setAttribute('aria-pressed', String(estado.respuestas[pasoActual.clave] === opcion));
      boton.addEventListener('click', () => {
        estado.respuestas[pasoActual.clave] = opcion;
        estado.paso += 1;
        render(true);
      });
      return boton;
    });
    ui.opciones.replaceChildren(...botones);
    if (moverFoco) ui.pregunta.focus({ preventScroll: true });
  };

  ui.volver.addEventListener('click', () => {
    estado.paso = Math.max(0, estado.paso - 1);
    render(true);
  });
  inputNombre.addEventListener('input', actualizarEnlace);

  document.querySelectorAll('[data-terapia]').forEach((enlace) => enlace.addEventListener('click', () => {
    estado.respuestas.terapia = enlace.dataset.terapia;
    estado.paso = 1;
    render(false);
  }));

  render(false);
}

document.addEventListener('DOMContentLoaded', () => {
  iniciarMenu();
  iniciarEnlacesWhatsapp();
  iniciarOnda();
  iniciarRueda();
  iniciarFormulario();
  iniciarRevelado();
  iniciarVideosVisibles();
});
