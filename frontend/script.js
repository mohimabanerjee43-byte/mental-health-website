// QUESTIONS
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


// DISPLAY QUESTIONS
const container = document.getElementById("questions");

questions.forEach((q, i) => {
  container.innerHTML += `
    <p>${i + 1}. ${q.text}</p>

    <select id="q${i}">
      <option value="0">Not at all</option>
      <option value="1">Several days</option>
      <option value="2">More than half the days</option>
      <option value="3">Nearly every day</option>
    </select>

    <br><br>
  `;
});


// PROGRESS BAR FUNCTION
function progressBar(label, value, color) {
  return `
    <div>
      <b>${label} (${value}%)</b>

      <div class="progress-bar">
        <div class="progress" style="background:${color}" data-value="${value}"></div>
      </div>
    </div>
  `;
}


// SUBMIT TEST
async function submitTest() {

  let answers = [];

  questions.forEach((q, i) => {
    answers.push({
      type: q.type,
      value: parseInt(document.getElementById(`q${i}`).value)
    });
  });


  const res = await fetch("http://localhost:3000/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answers })
  });

  const data = await res.json();


  // Convert backend values to numbers
  const anxiety = Number(data.anxiety);
  const depression = Number(data.depression);


  const anxietyColor =
    anxiety < 30 ? "#4caf50" :
    anxiety < 60 ? "#ff9800" :
    "#f44336";

  const depressionColor =
    depression < 30 ? "#4caf50" :
    depression < 60 ? "#ff9800" :
    "#f44336";


  let suggestion = "";


  // 🌟 PERFECT MENTAL HEALTH
  if (anxiety <= 0 && depression <= 0) {

    suggestion = `
      <h2>🌟 Amazing!</h2>
      <p>You have a great lifestyle! Keep going 👍</p>

      <h3>Healthy Daily Routine</h3>
      <ol>
        <li>Wake up early and stretch 🌅</li>
        <li>Eat a nutritious breakfast 🥣</li>
        <li>Focus on studies or work 📚</li>
        <li>Take small breaks to refresh your mind</li>
        <li>Spend time with family or friends 👨‍👩‍👧</li>
        <li>Exercise or play sports 🏃</li>
        <li>Relax before sleep and maintain a fixed bedtime 😴</li>
      </ol>
    `;
  }


  // 🟢 LOW LEVEL
  else if (anxiety < 30 && depression < 30) {

    suggestion = `
      <h3>🧘 Recommended Yoga</h3>

      <ul>
        <li>Tadasana</li>
        <li>Vrikshasana</li>
        <li>Bhujangasana</li>
      </ul>

      <h3>📅 Daily Routine</h3>

      <ol>
        <li>6:30 AM – Wake up and drink water 💧</li>
        <li>6:45 AM – Light stretching or yoga</li>
        <li>7:30 AM – Healthy breakfast</li>
        <li>Morning – Study/work 📚</li>
        <li>Afternoon – Short walks</li>
        <li>Evening – Outdoor activity 🌳</li>
        <li>Night – Relax with music or reading 📖</li>
        <li>Sleep before 11 PM 😴</li>
      </ol>

      <h3>🗣️ Communication Tips</h3>

      <ul>
        <li>Speak slowly and clearly</li>
        <li>Maintain eye contact</li>
        <li>Listen carefully before replying</li>
        <li>Practice conversations with friends</li>
      </ul>
    `;
  }


  // 🟡 MODERATE LEVEL
  else if (anxiety < 60 || depression < 60) {

    suggestion = `
      <h3>🧘 Yoga for Stress Relief</h3>

      <ul>
        <li>Surya Namaskar</li>
        <li>Balasana</li>
        <li>Setu Bandhasana</li>
        <li>Deep breathing exercises</li>
      </ul>

      <h3>📅 Daily Routine</h3>

      <ol>
        <li>Morning breathing exercises 🌬️</li>
        <li>10 minutes meditation 🧘</li>
        <li>Healthy breakfast</li>
        <li>Focus on one task at a time</li>
        <li>Take regular breaks</li>
        <li>Evening walk or exercise 🏃</li>
        <li>Write a gratitude journal ✍️</li>
        <li>Avoid screens before sleep 📵</li>
        <li>Sleep by 10:30–11 PM 😴</li>
      </ol>

      <h3>🗣️ Communication Tips</h3>

      <ul>
        <li>Take deep breaths before speaking</li>
        <li>Prepare what you want to say</li>
        <li>Start conversations with simple topics</li>
        <li>Practice speaking in front of a mirror</li>
        <li>Remember mistakes are normal</li>
      </ul>
    `;
  }


  // 🔴 HIGH LEVEL
  else {

    suggestion = `
      <h3>🧘 Relaxing Yoga</h3>

      <ul>
        <li>Balasana (Child Pose)</li>
        <li>Legs Up The Wall</li>
        <li>Deep breathing</li>
        <li>Guided meditation</li>
      </ul>

      <h3>📅 Routine for Managing Anxiety</h3>

      <ol>
        <li>Practice breathing exercises 🌬️</li>
        <li>Morning meditation</li>
        <li>Break work into smaller tasks</li>
        <li>Spend time outdoors 🌿</li>
        <li>Light exercise</li>
        <li>Talk with trusted people 👥</li>
        <li>Reduce caffeine ☕</li>
        <li>Maintain a sleep schedule 😴</li>
      </ol>

      <h3>🗣️ Communication Tips</h3>

      <ul>
        <li>Pause and breathe before responding</li>
        <li>Speak slowly and clearly</li>
        <li>Practice conversations with trusted people</li>
        <li>Write your thoughts before discussing</li>
        <li>Remember sharing feelings helps</li>
      </ul>
    `;
  }



  document.getElementById("result").innerHTML = `
    <h2>📊 Results</h2>

    ${progressBar("Anxiety", anxiety, anxietyColor)}
    ${progressBar("Depression", depression, depressionColor)}

    ${suggestion}

    <p style="font-size:12px;color:gray;margin-top:20px">
    This test is for awareness only and is not a medical diagnosis.
    </p>
  `;


  setTimeout(() => {
    document.querySelectorAll(".progress").forEach(el => {
      el.style.width = el.dataset.value + "%";
    });
  }, 100);

}