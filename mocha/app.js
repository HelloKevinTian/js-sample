var assert = require("assert");
var fs = require('fs');
require('should');

//----------------------test1----------------------------

// describe('Array', function(){
//     describe('#indexOf()', function(){
//         it('should return -1 when the value is not present', function(){
//             assert.equal(-1, [1,2,3].indexOf(5));
//             assert.equal(-1, [1,2,3].indexOf(0));
//         })
//     })
// });

//-----------------------test2-----------------------------

// describe('File', function(){
//     describe('#readFile()', function(){
//         it('should read package.json without error', function(done){
//             fs.readFile('package.json', function(err){
//                 if (err) throw err;
//                 done();
//             });
//         })
//     })
// })


//-------------------------test3------------------------------

// describe('File', function(){
//     describe('#readFile()', function(){
//         it('should read package.json without error', function(done){
//             fs.readFile('package.json', function(err){
//                 if (err) throw err;
//                 done();
//             });
//         })
//         it('should read test.json without error', function(done){
//             fs.readFile('test.json', function(err){
//                 if (err) throw err;
//                 done();
//             });
//         })
//     })
// })

//----------------------------test4------------------------------

// describe('Array', function(){
//     describe('#indexOf()', function(){
//         it('should return -1 when the value is not present', function(){
//         })
//     })
// });

//-----------------------------test5------------------------------

// describe('File', function(){
//     describe('#readFile()', function(){
//         it.skip('should read test.json without error', function(done){
//             fs.readFile('test_error.json', function(err){
//                 if (err) throw err;
//                 done();
//             });
//         })
//         it.only('should read package.json without error', function(done){
//         	done();
//         })
//         it('should read package.json without error', function(done){
//         	done();
//         })
//     })
// })

//------------------------------test6--------------------------------

// before(function(done) {
// 	this.timeout(3000);
// 	setTimeout(done, 2000);
// })

// it('should work', function(done) {
// 	done();
// });

//-----------------------------------test7-----------------------------

// describe('Array', function(){
//   describe('#push()', function(){
//     it('should append a value', function(){
//       foo = 'asdf'
//       var arr = [];
//       arr.push('foo');
//       arr.push('bar');
//       arr.push('baz');
//         assert('foo' == arr[0]); // to test indentation
//         assert('bar' == arr[1]);
//       assert('baz' == arr[2]);
//     })

//     it('should return the length', function(){
//       var arr = [];
//       assert(1 == arr.push('foo'));
//       assert(2 == arr.push('bar'));
//       assert(3 == arr.push('baz'));
//     })
//   })
// })

// describe('Array', function(){
//   describe('#pop()', function(){
//     it('should remove and return the last value', function(){
//       var arr = [1,2,3];
//       assert(arr.pop() == 3);
//       assert(arr.pop() == 2);
//       assert(arr.pop() == 1);
//     })

//     it('should adjust .length', function(){
//       var arr = [1,2,3];
//       arr.pop();
//       assert(arr.length == 2);
//     })
//   })
// })

//------------------------------test8-----------------------------

// function limit(num) {
// 	if (num < 0) {
// 		return 0;
// 	}
// 	return num;
// }

// describe('module', function() {
// 	before(function() {
// 		console.log('Pre something');
// 	});
// 	describe('limit', function() {
// 		it('limit should success', function() {
// 			limit(10);
// 		});
// 	});
// 	after(function() {
// 		console.log('Post something');
// 	});
// });

// describe('module', function() {
// 	beforeEach(function() {
// 		console.log('Pre something111');
// 	});
// 	describe('limit', function() {
// 		it('limit should success', function() {
// 			limit(10);
// 		});
// 	});
// 	afterEach(function() {
// 		console.log('Post something111');
// 	});
// });

//--------------------------------test9---------------------------

describe('async', function(){
  var calls = [];

  before(function(){
    calls.push('root before all');
  })

  after(function(){
    calls.push('root after all');
    calls.should.eql([
        'root before all'
      , 'before all'
      , 'parent before'
      , 'before'
      , 'before test one'
      , 'one'
      , 'after'
      , 'after test one passed'
      , 'parent after'
      , 'parent before'
      , 'before'
      , 'before test two'
      , 'two'
      , 'after'
      , 'after test two passed'
      , 'parent after'
      , 'parent before'
      , 'before'
      , 'before test three'
      , 'three'
      , 'after'
      , 'after test three passed'
      , 'parent after'
      , 'after all'
      , 'root after all']);
  })

  beforeEach(function(){
    calls.push('parent before');
  })

  afterEach(function(){
    calls.push('parent after' );
  })

  describe('hooks', function(){
    before(function(){
      calls.push('before all');
    });

    after(function(){
      calls.push('after all');
    });

    beforeEach(function(done){
      var ctx = this;
      process.nextTick(function(){
        calls.push('before');
        if (ctx.currentTest) {
          calls.push('before test ' + ctx.currentTest.title);
        }
        done();
      })
    })

    it('one', function(done){
      calls.should.eql([
          'root before all'
        , 'before all'
        , 'parent before'
        , 'before'
        , 'before test one']);
      calls.push('one');
      process.nextTick(done);
    })

    it('two', function(){
      calls.should.eql([
          'root before all'
        , 'before all'
        , 'parent before'
        , 'before'
        , 'before test one'
        , 'one'
        , 'after'
        , 'after test one passed'
        , 'parent after'
        , 'parent before'
        , 'before'
        , 'before test two']);
      calls.push('two');
    })

    it('three', function(){
      calls.should.eql([
          'root before all'
        , 'before all'
        , 'parent before'
        , 'before'
        , 'before test one'
        , 'one'
        , 'after'
        , 'after test one passed'
        , 'parent after'
        , 'parent before'
        , 'before'
        , 'before test two'
        , 'two'
        , 'after'
        , 'after test two passed'
        , 'parent after'
        , 'parent before'
        , 'before'
        , 'before test three']);
      calls.push('three');
    })

    afterEach(function(done){
      var ctx = this;
      process.nextTick(function(){
        calls.push('after');
        if (ctx.currentTest) {
          calls.push('after test ' + ctx.currentTest.title + ' ' + ctx.currentTest.state);
        }
        done();
      })
    })
  })
})