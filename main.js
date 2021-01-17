let currentCard = 0;
let cards = [];
let clicks = 0;

fetch('data.txt')
.then(x => x.text())
.then(data => {
  parseData(data);
  buildCards();
});
$('#main').on('click', next);
$('#easter').on('click', next);
document.addEventListener('touchmove', (e) => { e.preventDefault(); }, { passive:false });

function parseData(data) {
  // const qReg = RegExp(/[0-9]+[.]\s/);
  // const aReg = RegExp();
  let lines = data.split('\n');
  for (l of lines) {
    let qMatch = /[0-9]+[.]\s/.exec(l);
    if (qMatch) {
      currentCard = {
        q: l.substring(qMatch[0].length),
        a: []
      }
      cards.push(currentCard);
    } else {
      currentCard.a.push(l.substring(2));
    }
  }
  currentCard = 0;
}

function buildCards() {
  console.log('build')
  for (c in cards) {
    let elt = $('<div id="q'+c+'" class="card"><div class="q"></div><div class="a"></div></div>');
    elt.find('.q').text(cards[c].q);
    elt.find('.a').html(cards[c].a.join('<br>'));
    if (cards[c].a.length > 6 || cards[c].a.join(' ').length > 240) {
      elt.find('.a').addClass('smaller');
    }
    else if (cards[c].a.length > 3 || cards[c].a.join(' ').length > 120) {
      elt.find('.a').addClass('small');
    }
    $('#cards').append(elt);
  }
}

function pickRandomCard() {
  let n = currentCard;
  while (n === currentCard) {
    n = Math.floor(Math.random() * cards.length);
  }
  showCard(n);
}

function showCard(n) {
  $('.card').hide();
  $('.a').hide();
  $('.q').show();
  $('#q'+currentCard).show();
  console.log(currentCard)
}

function next() {
  $('#intro').remove();
  $('#easter').hide();
  clicks++;
  if (clicks === 30) { easter('Behnaz for President'); }
  else if (clicks === 50) { easter('Keep going! You\'re so close to becoming a citizen in a country with universal basic income and healthcare!<br>Oh wait, jk lol.'); }
  else if (clicks === 100) { easter('Joons<br>Not<br>Bombs'); }
  else if (clicks === 150) { easter('Liberty and justice for Behnaz'); }

  let card = $('#q'+currentCard);
  if (card.find('.q').is(':visible')) { // show answer
    card.find('.q').hide();
    card.find('.a').show();
  } else { // show next q
    pickRandomCard();
  }
}

function easter(msg) {
  $('#message').html(msg);
  $('#easter').show();
}