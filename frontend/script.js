const questions = [
  { text: "Do you often feel nervous, anxious, or on edge without a clear reason?", type: "anxiety" },
  { text: "Do you find yourself overthinking situations or worrying excessively about future events?", type: "anxiety" },
  { text: "Do you have difficulty relaxing even when you have free time?", type: "anxiety" },
  { text: "Do you feel restless, like you cannot sit still or stay calm for long?", type: "anxiety" },
  { text: "Do you get irritated or annoyed easily over small things?", type: "anxiety" },
  { text: "Do you frequently feel afraid as if something bad might happen?", type: "anxiety" },

  { text: "Do you experience trouble falling asleep, staying asleep, or sleeping too much?", type: "depression" },
  { text: "Do you often feel tired, low on energy, or physically drained?", type: "depression" },
  { text: "Do you feel hopeless or think that things won’t get better?", type: "depression" },
  { text: "Have you lost interest or pleasure in activities you used to enjoy?", type: "depression" },
  { text: "Do you feel sad, empty, or emotionally down most of the day?", type: "depression" },
  { text: "Do you struggle with low self-confidence or feel like you're not good enough?", type: "depression" },
  { text: "Do you often feel lonely, even when you are around other people?", type: "depression" },
  { text: "Do you have difficulty concentrating on tasks like studying, working, or conversations?", type: "depression" },
  { text: "Do you frequently experience negative thoughts about yourself or your life?", type: "depression" }
];

const container = document.getElementById("questions");

questions.forEach((q, i) => {
  container.innerHTML += `
    <p>${i+1}. ${q.text}</p>
    <select id="q${i}">
      <option value="0">Not at all</option>
      <option value="1">Several days</option>
      <option value="2">More than half the days</option>
      <option value="3">Nearly every day</option>
    </select>
  `;
});

function progressBar(label, value, color){
  return `
    <div>
      <b>${label} (${value}%)</b>
      <div class="progress-bar">
        <div class="progress" style="background:${color}" data-value="${value}"></div>
      </div>
    </div>
  `;
}

async function submitTest(){
  let answers=[];

  questions.forEach((q,i)=>{
    answers.push({
      type:q.type,
      value:parseInt(document.getElementById(`q${i}`).value)
    });
  });

  const res = await fetch("http://localhost:3000/analyze",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({answers})
  });

  const data = await res.json();

  const anxietyColor = data.anxiety < 30 ? "#4caf50" : data.anxiety < 60 ? "#ff9800" : "#f44336";
  const depressionColor = data.depression < 30 ? "#4caf50" : data.depression < 60 ? "#ff9800" : "#f44336";

  document.getElementById("result").innerHTML = `
    <h2>📊 Results</h2>

    ${progressBar("Anxiety", data.anxiety, anxietyColor)}
    ${progressBar("Depression", data.depression, depressionColor)}

    <h3>🧘 Yoga</h3>
    <ul>
      <li>Surya Namaskar</li>
      <li>Tadasana</li>
      <li>Vrikshasana</li>
    </ul>

    <h3>🌅 Morning Routine</h3>
    <ol>
      <li>Wake up early (6–7 AM) ⏰</li>
      <li>Avoid phone for 30 minutes 📵</li>
      <li>Meditation 🧘</li>
      <li>Light yoga 🧘‍♂️</li>
      <li>Healthy breakfast 🥣</li>
    </ol>

    <h3>☀️ Day Routine</h3>
    <ol start="6">
      <li>Plan tasks 📝</li>
      <li>Focused work ⏳</li>
      <li>Drink water 💧</li>
      <li>Sunlight 🌞</li>
      <li>Limit caffeine ☕</li>
    </ol>

    <h3>🌇 Evening Routine</h3>
    <ol start="11">
      <li>Exercise 🏃</li>
      <li>Talk to someone 👥</li>
      <li>Gratitude 🙏</li>
    </ol>

    <h3>🌙 Night Routine</h3>
    <ol start="14">
      <li>No screens 📵</li>
      <li>Relax 🎧</li>
      <li>Sleep 😴</li>
    </ol>

    <h3>🗣️ Communication Tips</h3>
    <ul>
      <li>Speak slowly</li>
      <li>Eye contact 👀</li>
      <li>Listen 👂</li>
      <li>Be confident 💬</li>
    </ul>
  `;

  setTimeout(()=>{
    document.querySelectorAll(".progress").forEach(el=>{
      el.style.width = el.dataset.value + "%";
    });
  },100);
}