(function() {
  var animation = document.querySelector('.equalizer');
  
  function onAnimation( evt ) {
    evt.stopPropagation();
  }
  
  animation.addEventListener('webkitAnimationStart', onAnimation, false);
  animation.addEventListener('webkitAnimationIteration', onAnimation, false);
  animation.addEventListener('animationStart', onAnimation, false);
  animation.addEventListener('animationIteration', onAnimation, false);
}());