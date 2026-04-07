/* main.js - moved from index.html inline script for modularity */

const chatbotQuestions = [
  { category: 'Informations Générales', questions: [
    'Qu\'est-ce que le Bac Pro CIEL ?',
    'Quelles sont les matières étudiées ?',
    'Quels métiers après le Bac Pro CIEL ?'
  ]},
  { category: 'Études et Perspectives', questions: [
    'Peut-on poursuivre des études ?',
    'Y a-t-il des stages en entreprise ?',
    'Quel profil pour réussir ?'
  ]},
  { category: 'Vie Professionnelle', questions: [
    'Comment bien réussir en Bac Pro ?',
    'Quels débouchés après un Bac Pro ?',
    'Pourquoi la cybersécurité est importante ?'
  ]}
];

const chatbotResponses = {
  'Qu\'est-ce que le Bac Pro CIEL ?': 'Le Bac Pro CIEL (Cybersécurité, Informatique et Réseaux, Électronique) est une formation qui prépare aux métiers de l\'informatique, des réseaux et de la cybersécurité.',
  'Quelles sont les matières étudiées ?': 'En plus des matières générales, les matières professionnelles incluent la programmation, les réseaux, la cybersécurité, l\'électronique et la maintenance informatique.',
  'Quels métiers après le Bac Pro CIEL ?': 'Technicien informatique, administrateur réseau, technicien en cybersécurité, installateur de systèmes électroniques, etc.',
  'Peut-on poursuivre des études ?': 'Oui ! Il est possible de faire un BTS, un DUT, ou même une école d\'ingénieur après une prépa adaptée.',
  'Y a-t-il des stages en entreprise ?': 'Oui, plusieurs périodes de stages sont prévues pour acquérir de l\'expérience professionnelle.',
  'Quel profil pour réussir ?': 'Il faut être curieux, logique, aimer les nouvelles technologies et savoir résoudre des problèmes.',
  'Comment bien réussir en Bac Pro ?': 'Être organisé, bien suivre les cours, faire des recherches personnelles et pratiquer sur des projets concrets.',
  'Quels débouchés après un Bac Pro ?': 'Soit entrer directement sur le marché du travail, soit poursuivre ses études pour se spécialiser.',
  'Pourquoi la cybersécurité est importante ?': 'Car les menaces informatiques sont de plus en plus nombreuses et les entreprises recherchent des experts en sécurité.'
};

/* Tombstone notes: the following functions were removed from index.html and reimplemented here:
   // removed function toggleChatbot() {}
   // removed function displayCategories() {}
   // removed function displayQuestions() {}
   // removed function showAnswer() {}
   // removed function openDocsityModal() {}
   // removed function closeDocsityModal() {}
*/

export function toggleChatbot() {
  const chatbotWindow = document.getElementById('chatbotWindow');
  const isOpen = chatbotWindow.style.display === 'flex';
  
  chatbotWindow.style.display = isOpen ? 'none' : 'flex';
  document.body.classList.toggle('chatbot-open', !isOpen);
  
  if (!isOpen) {
    displayCategories();
  }
}

export function displayCategories() {
  const chatbotCategories = document.getElementById('chatbotCategories');
  const chatbotMessages = document.getElementById('chatbotMessages');
  
  if (!chatbotCategories || !chatbotMessages) return;
  chatbotCategories.innerHTML = '';
  chatbotMessages.innerHTML = `
    <div class="bot-message">
      Bonjour ! Je suis votre assistant. Choisissez une catégorie de questions.
    </div>
  `;

  chatbotQuestions.forEach(category => {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'category-btn';
    categoryDiv.textContent = category.category;
    categoryDiv.onclick = () => {
      document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
      categoryDiv.classList.add('active');
      displayQuestions(category);
    };
    chatbotCategories.appendChild(categoryDiv);
  });
}

export function displayQuestions(category) {
  const chatbotCategories = document.getElementById('chatbotCategories');
  const chatbotMessages = document.getElementById('chatbotMessages');
  if (!chatbotCategories || !chatbotMessages) return;
  
  chatbotCategories.innerHTML = '';
  chatbotMessages.innerHTML += `
    <div class="bot-message question-highlight">
      Catégorie : ${category.category}. Choisissez une question.
    </div>
  `;

  category.questions.forEach(question => {
    const questionDiv = document.createElement('div');
    questionDiv.className = 'question-btn';
    questionDiv.textContent = question;
    questionDiv.onclick = () => {
      document.querySelectorAll('.question-btn').forEach(btn => btn.classList.remove('active'));
      questionDiv.classList.add('active');
      showAnswer(question);
    };
    chatbotCategories.appendChild(questionDiv);
  });

  const returnDiv = document.createElement('div');
  returnDiv.className = 'return-btn';
  returnDiv.textContent = 'Retour aux catégories';
  returnDiv.onclick = displayCategories;
  chatbotCategories.appendChild(returnDiv);
}

export function showAnswer(question) {
  const chatbotMessages = document.getElementById('chatbotMessages');
  const chatbotCategories = document.getElementById('chatbotCategories');
  if (!chatbotMessages || !chatbotCategories) return;
  
  const messageContainer = document.createElement('div');
  messageContainer.innerHTML = `
    <div class="bot-message question-highlight">
      Question : ${question}
    </div>
    <div class="bot-message answer-display">
      Réponse : ${chatbotResponses[question]}
    </div>
  `;
  
  chatbotMessages.appendChild(messageContainer);
  
  chatbotCategories.innerHTML = `
    <button onclick="displayCategories()" class="return-btn">Retour aux catégories</button>
  `;
  
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

export function openDocsityModal() {
  const el = document.getElementById('docsity-modal');
  if (el) el.style.display = 'flex';
}

export function closeDocsityModal() {
  const el = document.getElementById('docsity-modal');
  if (el) el.style.display = 'none';
}

/* Attach simple global helpers so existing inline handlers (onclick attributes) keep working */
window.toggleChatbot = toggleChatbot;
window.displayCategories = displayCategories;
window.displayQuestions = displayQuestions;
window.showAnswer = showAnswer;
window.openDocsityModal = openDocsityModal;
window.closeDocsityModal = closeDocsityModal;

/* Paris clock: displays current time in Europe/Paris and updates every second (date removed) */
export function startParisClock() {
  const el = document.getElementById('paris-clock');
  if (!el) return;

  const timeFormatter = new Intl.DateTimeFormat('fr-FR', {
    timeZone: 'Europe/Paris',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  function update() {
    const now = new Date();
    el.textContent = timeFormatter.format(now);
  }

  update();
  setInterval(update, 1000);
}

/* Start clock automatically when main.js loads */
startParisClock();
