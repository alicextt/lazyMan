(function (window){
  const task = [];

  /**
   * subscribe - subscribe tasks to task queue
   *
   * @return {type}
   */
  function subscribe() {
    var param = {};
    var args = Array.prototype.slice.call(arguments);
    if(args.length<1){
      throw new Error('subscribe arguments is empty');
    }
    param.method = args[0];
    param.args = args.slice(1);
    if(param.method === 'sleepFirst'){
      task.unshift(param);
    }else{
      task.push(param);
    }
  }

  /**
   * publish -execute task from task list
   *
   * @return {type}
   */
  function publish() {
    if( task.length >0) {
      run(task.shift());
    }
  }

  /**
   * run - run the task
   *
   * @param  {type} param description
   * @return {type}       description
   */
  function run(param) {
    var msg = param.method;
    var args = param.args;
    switch(msg){
      case 'lazyMan': lazyMan.apply(null, args); break;
      case 'eat': eat.apply(null, args); break;
      case 'sleep':
      case 'sleepFirst': sleep.apply(null, args); break;
      default: ;
    }
  }

  function LazyMan(){};
  LazyMan.prototype.sleep = function(t) {
    subscribe('sleep', t);
    return this;
  }

  LazyMan.prototype.sleepFirst = function(t) {
    subscribe('sleepFirst', t);
    return this;
  }

  LazyMan.prototype.eat = function(str) {
    subscribe('eat', str);
    return this;
  }

  function lazyManlog(msg){
    console.log(msg);
  }

  function eat(str) {
    lazyManlog("Eat " + str + " !");
    publish();
  }

  function lazyMan(str) {
    lazyManlog("This is " + str + " !");
    publish();
  }

  function sleep(t) {
    setTimeout(function () {
      lazyManlog('Wake up after ' + t + ' seconds!');
      publish();
    }, 1000*t);
  }

  window.LazyMan=function(str){
    subscribe('lazyMan', str);
    setTimeout(function(){
        publish();
    }, 0);    // very important, to put publish to the end after all chaining are added to the task list
    return new LazyMan();
  }

})(window);
