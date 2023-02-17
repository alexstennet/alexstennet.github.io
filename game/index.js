var alphabet = 'abcdefghijklmnopqrstuvwxyz';
var letters = [];
var valid_words = [];
var found_words = [];

var fade_timer = null;
var wait_timer = null;

function setup() {
  for (let i = 0; i < 7; i++) {
    let val = Math.floor(Math.random() * alphabet.length);
    while (letters.indexOf(val) != -1) {
      val = Math.floor(Math.random() * alphabet.length);
    }
    letters.push(val);
  }
  for (let i = 0; i < 7; i++) {
    letters[i] = alphabet[letters[i]];
  }

  let cells = document.getElementsByClassName('letter');
  for (let i = 0; i < 7; i++) {
    cells[i].textContent = letters[i].toUpperCase();
  }

  let longest_valid_word = 0;
  for (let i = 0; i < words.length; i++) {
    let valid = true;
    let word = words[i];
    for (let j = 0; j < word.length; j++) {
      if (letters.indexOf(word[j]) == -1) {
        valid = false;
      }
    }
    if (word.length > 3 && word.indexOf(letters[0]) != -1 && valid) {
      valid_words.push(word);
      if (word.length > longest_valid_word) {
        longest_valid_word = word.length;
      }
    }
  }
  valid_words.sort()
  document.getElementById("total").textContent = valid_words.length.toString();

  let hint_letters = document.getElementById("hint_letters");
  for (let i = 0; i < letters.length; i++) {
    let letter = document.createElement('span');
    letter.textContent = ' ' + letters[i].toUpperCase();
    if (i == 0) {
      letter.classList.add('center_letter');
    } else {
      letter.classList.add('noncenter_letter');
    }
    hint_letters.appendChild(letter);
  }

  let hint_total = document.getElementById('hint_total');
  hint_total.textContent = valid_words.length.toString();

  let hint_found = document.getElementById('hint_found');
  hint_found.textContent = '0';

  let distribution = {};
  for (let i = 0; i < letters.length; i++) {
    distribution[letters[i]] = {};
    for (let j = 0; j < longest_valid_word; j++) {
      distribution[letters[i]][j+1] = 0;
      distribution[j+1] = 0;
    }
  }
  for (let i = 0; i < valid_words.length; i++) {
    let word = valid_words[i];
    distribution[word[0]][word.length] += 1;
    distribution[word.length] += 1;
  }

  let hint_grid = document.getElementById('hint_grid');
  let first_row = document.createElement('tr');
  first_row.appendChild(document.createElement('td'));
  for (let i = 0; i < longest_valid_word; i++) {
    let td = document.createElement('td');
    td.textContent = (i+1).toString();
    first_row.appendChild(td);
  }
  let sigma1 = document.createElement('td');
  sigma1.textContent = 'Σ';
  first_row.appendChild(sigma1);
  hint_grid.appendChild(first_row);
  for (let i = 0; i < letters.length; i++) {
    let tr = document.createElement('tr');

    let td_letter = document.createElement('td');
    td_letter.textContent = letters[i].toUpperCase();
    tr.appendChild(td_letter);

    let total = 0;
    for (let j = 0; j < longest_valid_word; j++) {
      let td = document.createElement('td');
      let num = distribution[letters[i]][j+1];
      if (num != 0) {
        td.textContent = num.toString();
      } else {
        td.textContent = '-';
      }
      tr.appendChild(td);
      total += distribution[letters[i]][j+1];
    }

    let td_sigma = document.createElement('td');
    td_sigma.textContent = total.toString();
    tr.appendChild(td_sigma);
    hint_grid.appendChild(tr);
  }
  let row_total = document.createElement('tr');
  let sigma2 = document.createElement('td');
  sigma2.textContent = 'Σ';
  row_total.appendChild(sigma2);
  let sum = 0;
  for (let i = 0; i < longest_valid_word; i++) {
    let td = document.createElement('td');
    td.textContent = distribution[i+1].toString();
    sum += distribution[i+1];
    row_total.appendChild(td);
  }
  let td_sum = document.createElement('td');
  td_sum.textContent = sum.toString();
  row_total.appendChild(td_sum);
  hint_grid.appendChild(row_total);

  let solutions = document.getElementById('solution_list');
  for (let i = 0; i < valid_words.length; i++) {
    if (i != 0) {
      solutions.textContent += '\n'
    }
    solutions.textContent += valid_words[i];
  }
}
window.onload = setup;

function cycle() {
  let new_letters = [letters.shift()];
  letters.sort(() => (0.5-Math.random()));
  new_letters.push.apply(new_letters, letters);
  letters = new_letters;

  let cells = document.getElementsByClassName('letter');
  for (let i = 0; i < 7; i++) {
    cells[i].textContent = letters[i].toUpperCase();
  }
}

function addLetter(c) {
  c = c.toLowerCase();
  let entry = document.getElementById("entry");
  if (entry.children.length == 28) {
    return;
  }
  let span = document.createElement('span');
  span.textContent = c.toUpperCase();
  if (letters[0] == c) {
    span.classList.add('center_letter');
  } else if (letters.indexOf(c) != -1) {
    span.classList.add('noncenter_letter');
  } else {
    span.classList.add('non_letter');
  }
  entry.appendChild(span);
}

window.onkeydown = function(e) {
  let key = e['key'].toLowerCase();
  if (alphabet.indexOf(key) != -1) {
    addLetter(key);
  }
  if (key == 'backspace') {
    d();
  }
  if (key == 'enter') {
    s();
  }
}

function letterClicked(e) {
  addLetter(e.textContent.trim());
}
function s() {
    let cur = document.getElementById("entry").textContent;
    if (cur == '') {
      return;
    }
    document.getElementById("entry").textContent = '';

    cur = cur.toLowerCase();
    if (cur.length <= 3) {
      showPopup("Must contain at least 4 letters");
      return;
    }
    if (cur.indexOf(letters[0]) == -1) {
      showPopup("Must contain center letter");
      return;
    }
    if (found_words.indexOf(cur) != -1) {
      showPopup('Already found');
      return;
    }
    for (let i = 0; i < cur.length; i++) {
      if (letters.indexOf(cur[i]) == -1) {
        showPopup('Bad letters');
        return;
      }
    }
    if (valid_words.indexOf(cur) == -1) {
      showPopup('Not in word list');
      return;
    }

    found_words.push(cur);
    found_words.sort();

    let words_div = document.getElementById("words");
    words_div.textContent = '';

    for (let i = 0; i < found_words.length; i++) {
      if (i != 0) {
        words_div.textContent += '\n';
      }
      words_div.textContent += found_words[i];
    }

    let cnt = Number(document.getElementById("count").textContent);
    document.getElementById("count").textContent = (cnt + 1).toString();
    document.getElementById('hint_found').textContent = (cnt + 1).toString();
}
function d() {
  let children = document.getElementById("entry").children;
  if (children.length == 0) {
    return;
  }
  document.getElementById("entry").removeChild(children[children.length - 1])
}

function showPopup(msg) {
  if (wait_timer != null) {
    clearTimeout(wait_timer);
  }
  if (fade_timer != null) {
    clearInterval(fade_timer);
  }

  let popup = document.getElementById('popup');
  popup.textContent = msg;
  popup.style.display = 'block';
  popup.style.opacity = 1;
  popup.style.filter = 'alpha(opacity=' + 100 + ")";

  wait_timer = setTimeout(function() {
    let op = 1;
    fade_timer = setInterval(function() {
      if (op <= 0.1) {
        clearInterval(fade_timer);
        popup.style.display = 'none';
      }
      popup.style.opacity = op;
      popup.style.filter = 'alpha(opacity=' + op * 100 + ")";
      op -= op * 0.1;
    }, 50);
  }, 500);
}

function hideHints() {
  document.getElementById('hint_overlay').style.display = 'none';
}

function showHints() {
  document.getElementById('hint_overlay').style.display = 'block';
}

function hideSolutions() {
  document.getElementById('solution_overlay').style.display = 'none';
}

function showSolutions() {
  document.getElementById('solution_overlay').style.display = 'block';
}
