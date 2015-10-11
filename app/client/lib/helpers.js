UI.registerHelper('isEquals', function(a,b) {
    return a === b;
});

Template.registerHelper('pluralize', function(n, thing) {
  // fairly stupid pluralizer
  if (n === 1) {
    return '1 ' + thing;
  } else {
    return n + ' ' + thing + 's';
  }
});

Template.registerHelper('numberizer', function(n) {
  // fairly stupid pluralizer
  if (n === 1) {
    return n + 'st';
  } else if (n % 20 == 2){
    return n + 'nd';
  } else if (n % 30 == 3){
    return n + 'rd';
  } else {
    return n + 'th';
  }
});