const text = document.getElementById("text");
const choices = document.getElementById("choices");
const background = document.getElementById("background");
const timer = document.getElementById("timer");

let current = "start";
let autoTimeout;
let choiceTimer;
let typingInterval;
let locked = false;

const typeSound = new Audio("type.mp3");
typeSound.volume = 0.15;

// DŹWIĘK

function playSound() {

  const sound = typeSound.cloneNode();
  sound.volume = 0.15;
  sound.play();
}

// PISANIE

function typeText(content) {

  clearInterval(typingInterval);

  text.textContent = "";

  let i = 0;

  typingInterval = setInterval(() => {

    if (i < content.length) {

      text.textContent += content[i];

      if (content[i] !== " ") {
        playSound();
      }
      i++;
    } else {
      clearInterval(typingInterval);
    }

  }, 35);
}

const story = {

 
  // START


  start: {
    text: "Dzwoni telefon...",
    image: "telefon_beta.jpg",
    nextAuto: "rozmowa"
  },

  rozmowa: {
    text: "Ktoś mówi cichym głosem: 'To pętla. Znowu zaczęło się od początku.'",
    image: "telefon_alfa.jpg",

    choices: [
      {
        text: "Co to znaczy?",
        next: "pytanie"
      },

      {
        text: "Kim ty jesteś?",
        next: "pytanie1"
      },

      {
        text: "Rozłączam się.",
        next: "rozlaczenie"
      }
    ]
  },


  // PĘTLA
 

  pytanie: {
    text: "To już wydarzyło się wiele razy. Za każdym razem kończy się tak samo.",
    image: "telefon_beta.jpg",

    timeLimit: 8,
    timeoutNext: "timeout1",

    choices: [
      {
        text: "Słucham dalej.",
        next: "sluchaj_dalej"
      },

      {
        text: "Nie wierzę ci.",
        next: "koniec4"
      },

      {
        text: "Skąd masz mój numer?",
        next: "numer"
      }
    ]
  },

  numer: {
    text: "Bo to ty zadzwoniłeś do mnie... jutro.",
    image: "telefon_glitch.jpg",

    choices: [
      {
        text: "To niemożliwe.",
        next: "koniec4"
      },

      {
        text: "Mów dalej.",
        next: "sluchaj_dalej"
      },

      {
        text: "Rozłączam się.",
        next: "rozlaczenie"
      }
    ]
  },

  pytanie1: {
    text: "Kiedyś się dowiesz. Jeśli przeżyjesz tę noc.",
    image: "telefon_alfa.jpg",

    choices: [
      {
        text: "Rozumiem...",
        next: "plan"
      },

      {
        text: "Brzmisz jak wariat.",
        next: "koniec3"
      },

      {
        text: "Co mam zrobić?",
        next: "plan"
      }
    ]
  },

  timeout1: {
    text: "Milczysz zbyt długo. Głos po drugiej stronie szepcze: 'Za późno.'",
    image: "ciemnosc.jpg",
    nextAuto: "reset"
  },

 
  // DRZWI
  

  sluchaj_dalej: {
    text: "Mężczyzna ciężko oddycha. 'Za chwilę ktoś zapuka do twoich drzwi.'",
    image: "ciemny_pokoj.jpg",

    choices: [
      {
        text: "Skąd to wiesz?",
        next: "plan"
      },

      {
        text: "Rozłączam się.",
        next: "rozlaczenie"
      },

      {
        text: "Gaszę światło.",
        next: "ciemny_pokoj1"
      }
    ]
  },

  ciemny_pokoj1: {
    text: "Pokój pogrąża się w ciemności. Słyszysz kroki na korytarzu.",
    image: "pokoj_dark.jpg",

    choices: [
      {
        text: "Podchodzę do drzwi.",
        next: "drzwi1"
      },

      {
        text: "Ukrywam się.",
        next: "lazienka"
      },

      {
        text: "Patrzę przez wizjer.",
        next: "wizjer"
      }
    ]
  },

  plan: {
    text: "'Nie otwieraj drzwi. Cokolwiek usłyszysz.'",
    image: "drzwi.jpg",

    timeLimit: 5,
    timeoutNext: "drzwi_wybuch",

    choices: [
      {
        text: "Czekam w ciszy.",
        next: "cisza"
      },

      {
        text: "Patrzę przez wizjer.",
        next: "wizjer"
      },

      {
        text: "Chwytam nóż z kuchni.",
        next: "kuchnia"
      }
    ]
  },

  kuchnia: {
    text: "W kuchni światło zaczyna migotać. Słyszysz dzwoniący telefon za sobą.",
    image: "kuchnia.jpg",

    choices: [
      {
        text: "Odbieram telefon.",
        next: "telefon2"
      },

      {
        text: "Wracam do drzwi.",
        next: "wizjer"
      },

      {
        text: "Uciekam z mieszkania.",
        next: "ulica"
      }
    ]
  },

  telefon2: {
    text: "Telefon odbiera ktoś brzmiący dokładnie jak ty.",
    image: "telefon_ciemny.jpg",

    choices: [
      {
        text: "Kim jesteś?",
        next: "sobowtor2"
      },

      {
        text: "Rozłączam się.",
        next: "reset"
      },

      {
        text: "Słucham w ciszy.",
        next: "szepty"
      }
    ]
  },

  szepty: {
    text: "Słyszysz dziesiątki głosów szepczących jednocześnie: 'Nie otwieraj drzwi.'",
    image: "szepty.jpg",

    choices: [
      {
        text: "Odkładam telefon.",
        next: "wizjer"
      },

      {
        text: "Uciekam.",
        next: "ulica"
      },

      {
        text: "Krzyczę.",
        next: "panic"
      }
    ]
  },

  drzwi_wybuch: {
    text: "Nagle drzwi otwierają się same.",
    image: "drzwi_otwarte.jpg",
    nextAuto: "spotkanie"
  },

  cisza: {
    text: "Pukanie staje się coraz głośniejsze.",
    image: "ciemny_korytarz.jpg",

    choices: [
      {
        text: "Idę do drzwi.",
        next: "drzwi1"
      },

      {
        text: "Uciekam do łazienki.",
        next: "lazienka"
      },

      {
        text: "Wołam kto tam.",
        next: "echo_glos"
      }
    ]
  },

  echo_glos: {
    text: "Po drugiej stronie słyszysz własny głos: 'Nie otwieraj.'",
    image: "drzwi_cien.jpg",

    choices: [
      {
        text: "Patrzę przez wizjer.",
        next: "wizjer"
      },

      {
        text: "Otwieram drzwi.",
        next: "spotkanie"
      },

      {
        text: "Uciekam.",
        next: "ulica"
      }
    ]
  },

  wizjer: {
    text: "Za drzwiami stoi... ty sam.",
    image: "wizjer.jpg",

    timeLimit: 4,
    timeoutNext: "panic",

    choices: [
      {
        text: "Otwieram drzwi.",
        next: "spotkanie"
      },

      {
        text: "Odsuwam się.",
        next: "ucieczka"
      },

      {
        text: "Pytam kim jest.",
        next: "sobowtor2"
      }
    ]
  },

  panic: {
    text: "Nie możesz się ruszyć. Ktoś zaczyna dobijać się do drzwi.",
    image: "panic.jpg",
    nextAuto: "reset"
  },

 
  // SOBOWTÓR
  

  spotkanie: {
    text: "'W końcu otworzyłeś.'",
    image: "sobowtor.jpg",

    choices: [
      {
        text: "O co chodzi z tą pętlą?",
        next: "tajemnica"
      },

      {
        text: "Zamykam drzwi.",
        next: "reset"
      },

      {
        text: "Kim jesteś?",
        next: "sobowtor2"
      }
    ]
  },

  sobowtor2: {
    text: "'Jestem tobą. Tą wersją, której się nie udało.'",
    image: "sobowtor_cien.jpg",

    choices: [
      {
        text: "Co się stało?",
        next: "eksperyment"
      },

      {
        text: "Nie wierzę ci.",
        next: "koniec_zly"
      },

      {
        text: "Jak zatrzymać pętlę?",
        next: "zegar_prawda"
      }
    ]
  },

  tajemnica: {
    text: "'Każdej nocy próbujemy zatrzymać coś, co wydarzy się o północy.'",
    image: "zegar.jpg",

    choices: [
      {
        text: "Co się wydarzy?",
        next: "katastrofa"
      },

      {
        text: "Nie wierzę ci.",
        next: "reset"
      },

      {
        text: "Jak to zatrzymać?",
        next: "laboratorium"
      }
    ]
  },

  eksperyment: {
    text: "'To nie jest rzeczywistość. To eksperyment.'",
    image: "eksperyment.jpg",

    choices: [
      {
        text: "Jaki eksperyment?",
        next: "prawda"
      },

      {
        text: "Kłamiesz.",
        next: "koniec_zly"
      },

      {
        text: "Chcę poznać prawdę.",
        next: "laboratorium"
      }
    ]
  },

  prawda: {
    text: "'Każda wersja ciebie próbowała przerwać symulację.'",
    image: "symulacja.jpg",

    choices: [
      {
        text: "Jak ją wyłączyć?",
        next: "generator"
      },

      {
        text: "Kim jestem?",
        next: "subject"
      },

      {
        text: "Uciekam.",
        next: "ulica"
      }
    ]
  },

 
  // LABORATORIUM
  

  laboratorium: {
    text: "Kaseta ujawnia adres opuszczonego laboratorium.",
    image: "laboratorium.jpg",

    choices: [
      {
        text: "Jadę tam.",
        next: "lab"
      },

      {
        text: "To pułapka.",
        next: "reset"
      },

      {
        text: "Zabieram kasetę.",
        next: "kaseta2"
      }
    ]
  },

  kaseta2: {
    text: "Na odwrocie kasety widzisz napis: SUBJECT 08.",
    image: "kaseta_close.jpg",

    choices: [
      {
        text: "Jadę do laboratorium.",
        next: "lab"
      },

      {
        text: "Niszczę kasetę.",
        next: "koniec_zly"
      },

      {
        text: "Szukam informacji w internecie.",
        next: "internet"
      }
    ]
  },

  internet: {
    text: "Wszystkie wyniki wyszukiwania znikają po kilku sekundach.",
    image: "internet_dark.jpg",

    choices: [
      {
        text: "Jadę do laboratorium.",
        next: "lab"
      },

      {
        text: "Wyłączam komputer.",
        next: "reset"
      },

      {
        text: "Dzwonię na policję.",
        next: "telefon_policja"
      }
    ]
  },

  telefon_policja: {
    text: "W słuchawce słyszysz tylko szum i własny oddech.",
    image: "telefon_policja.jpg",

    choices: [
      {
        text: "Rozłączam się.",
        next: "lab"
      },

      {
        text: "Słucham dalej.",
        next: "panic"
      },

      {
        text: "Rzucam telefon.",
        next: "ulica"
      }
    ]
  },

  lab: {
    text: "W laboratorium widzisz ogromną maszynę pulsującą niebieskim światłem.",
    image: "maszyna.jpg",

    timeLimit: 5,
    timeoutNext: "koniec_zly",

    choices: [
      {
        text: "Wyłączam maszynę.",
        next: "koniec_dobry"
      },

      {
        text: "Dotykam panelu.",
        next: "koniec_zly"
      },

      {
        text: "Schodzę niżej.",
        next: "generator"
      }
    ]
  },

  generator: {
    text: "W piwnicy słyszysz setki dzwoniących telefonów.",
    image: "piwnica.jpg",

    choices: [
      {
        text: "Odbieram telefon.",
        next: "telefon_final"
      },

      {
        text: "Niszczę generator.",
        next: "koniec_dobry"
      },

      {
        text: "Uciekam.",
        next: "koniec_neutralny"
      }
    ]
  },

  telefon_final: {
    text: "Słyszysz własny głos: 'NIE ODBIERAJ.'",
    image: "telefon_final.jpg",

    choices: [
      {
        text: "Rozłączam się.",
        next: "koniec_dobry"
      },

      {
        text: "Słucham dalej.",
        next: "koniec_prawdziwy"
      },

      {
        text: "Rzucam telefon.",
        next: "koniec_neutralny"
      }
    ]
  },

  subject: {
    text: "'SUBJECT 08 — jedyny który pamięta poprzednie pętle.'",
    image: "subject08.jpg",

    choices: [
      {
        text: "Akceptuję prawdę.",
        next: "koniec_prawdziwy"
      },

      {
        text: "To niemożliwe.",
        next: "reset"
      },

      {
        text: "Chcę wrócić do domu.",
        next: "fake_home"
      }
    ]
  },

  
  // ULICA
 

  ulica: {
    text: "Miasto jest całkowicie puste.",
    image: "puste_miasto.jpg",

    choices: [
      {
        text: "Wołam o pomoc.",
        next: "echo"
      },

      {
        text: "Idę przed siebie.",
        next: "laboratorium"
      },

      {
        text: "Wracam do mieszkania.",
        next: "start"
      }
    ]
  },

  echo: {
    text: "Słyszysz tylko własny głos wracający echem: 'To pętla...'",
    image: "ulica_noc.jpg",
    nextAuto: "start"
  },


  // KOŃCÓWKI


  koniec_dobry: {
    text: "Telefon milknie. Po raz pierwszy zapada prawdziwa cisza.",
    image: "swiatlo.jpg"
  },

  koniec_prawdziwy: {
    text: "Otwierasz oczy w kapsule laboratoryjnej. To wszystko było eksperymentem.",
    image: "kapsula.jpg"
  },

  koniec_neutralny: {
    text: "Ukrywasz się w ciemności. Pętla trwa dalej.",
    image: "ciemny_korytarz.jpg"
  },

  koniec_zly: {
    text: "Ekrany zaczynają migotać. Słyszysz dzwoniący telefon...",
    image: "telefon_beta.jpg",
    nextAuto: "start"
  },

  koniec2: {
    text: "Połączenie się urywa.",
    image: "telefon_beta.jpg"
  },

  koniec3: {
    text: "Okej. Miłego życia w pętli.",
    image: "telefon_beta.jpg",
    nextAuto: "start"
  },

  koniec4: {
    text: "Dobra wiem że to dziwnie brzmi, ale musisz mi zaufać.",
    image: "telefon_beta.jpg",

    choices: [
      {
        text: "Dobra, zaufam ci.",
        next: "plan"
      },

      {
        text: "Nie, daj mi spokój.",
        next: "koniec3"
      },

      {
        text: "Potrzebuję dowodu.",
        next: "wizjer"
      }
    ]
  },

  rozlaczenie: {
    text: "Rozłączasz się. Po chwili telefon znowu dzwoni.",
    image: "telefon_beta.jpg",
    nextAuto: "rozmowa"
  },

  drzwi1: {
    text: "Kładziesz rękę na klamce.",
    image: "drzwi.jpg",

    choices: [
      {
        text: "Odbieram telefon.",
        next: "rozmowa"
      },

      {
        text: "Otwieram drzwi.",
        next: "spotkanie"
      },

      {
        text: "Uciekam.",
        next: "ulica"
      }
    ]
  },

  lazienka: {
    text: "W lustrze widzisz napis: 'NIE UFAMY SOBIE'.",
    image: "lustro.jpg",

    choices: [
      {
        text: "Dotykam lustra.",
        next: "reset"
      },

      {
        text: "Uciekam stamtąd.",
        next: "ulica"
      },

      {
        text: "Rozbijam lustro.",
        next: "koniec_zly"
      }
    ]
  },

  ucieczka: {
    text: "Cofasz się powoli, ale słyszysz kroki zza siebie.",
    image: "ciemnosc.jpg",

    choices: [
      {
        text: "Odwracam się.",
        next: "reset"
      },

      {
        text: "Biegnę do wyjścia.",
        next: "ulica"
      },

      {
        text: "Gaszę światło.",
        next: "panic"
      }
    ]
  },

  fake_home: {
    text: "Wracasz do mieszkania. Telefon znowu dzwoni.",
    image: "telefon_beta.jpg",
    nextAuto: "start"
  },

  reset: {
    text: "Wszystko nagle ciemnieje...",
    image: "black.jpg",
    nextAuto: "start"
  }
};

// SILNIK

function showScene() {
  locked = true;
  clearTimeout(autoTimeout);
  clearInterval(choiceTimer);
  clearInterval(typingInterval);
  timer.textContent = "";
  const scene = story[current];
  background.src = scene.image;
  choices.innerHTML = "";
  typeText(scene.text);


  if (scene.choices) {

    scene.choices.forEach(function(choice) {
      const button = document.createElement("button");
      button.textContent = choice.text;
      button.onclick = function() {
        if (locked) return;
        locked = true;
        clearInterval(choiceTimer);
        current = choice.next;
        showScene();
      };

      choices.appendChild(button);
    });
  }

  // TIMER

  if (scene.timeLimit) {
    let timeLeft = scene.timeLimit;
    timer.textContent = timeLeft;
    choiceTimer = setInterval(() => {
      timeLeft--;

      timer.textContent = timeLeft;
      if (timeLeft <= 2) {
        timer.style.color = "red";
        timer.style.transform = "scale(1.3)";

      } else {

        timer.style.color = "white";
        timer.style.transform = "scale(1)";
      }

      if (timeLeft <= 0) {

        clearInterval(choiceTimer);
        current = scene.timeoutNext;
        showScene();
      }

    }, 1000);

  } else {

    timer.textContent = "";
  }

  // AUTO SCENE

  if (scene.nextAuto) {
    autoTimeout = setTimeout(function() {
      current = scene.nextAuto;
      showScene();
    }, 3000);
  }

  setTimeout(() => {

    locked = false;

  }, 300);
}

showScene();



