QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});

QUnit.test("shape_dist_overrides 18 20", function(assert) {
   assert.deepEqual(compareHandshapes("18", "20"), 0.1, 'forward'); 
   assert.deepEqual(compareHandshapes("20", "18"), 0.1, 'reverse');
});

QUnit.test("compareHandshapes('20', vector)", function(assert) {
   assert.deepEqual(compareHandshapes('20', 23), 1); 
   assert.deepEqual(compareHandshapes('20', 24), 1); 
   assert.deepEqual(compareHandshapes('20', 37), 1); 
   assert.deepEqual(compareHandshapes('20', [23,24,37]), 1); 
   assert.deepEqual(compareHandshapes('20', [23,18,37]), 0.1,
        'shape_dist_overrides in play'); 
   assert.deepEqual(compareHandshapes('20', [23,18,20]), 0, 
        'Equal handshapes'); 
});

QUnit.test("compareHandshapes, different groups", function(assert) {
   assert.deepEqual(compareHandshapes(1, 2), CLEARLY_DIFFERENT); 
});

QUnit.test('BASE HAND', function(assert) {
    assert.deepEqual(compareHandshapes(93, 93), 0);
    assert.deepEqual(compareHandshapes(93, 5), 0);
    assert.deepEqual(compareHandshapes(13, 93), 0);
});

QUnit.test('compareNumHands', function(assert) {
    assert.deepEqual(compareNumHands(signs[0], signs[0]), 0);
    assert.deepEqual(compareNumHands(signs[0], signs[1]), 3);
    assert.deepEqual(compareNumHands(signs[1], signs[0]), 3);
    assert.deepEqual(compareNumHands(signs[1], signs[1]), 0);
    assert.deepEqual(compareNumHands(signs[0], signs[4]), 3);
    assert.deepEqual(compareNumHands(signs[1], signs[4]), 0.5);
})
