import test from 'node:test';
import assert from 'node:assert/strict';
import {recommend,budgetRanges,destinations,validEmail} from '../src/data.js';
test('all 36 quiz combinations produce honest, complete recommendations',()=>{
 const seen=new Set();
 for(let budget=0;budget<4;budget++)for(const transport of ['train','plane','either'])for(const vibe of ['chill','culture','party']){
 const {destination:d,tradeoffs}=recommend({budget,transport,vibe});seen.add(d.name);
 assert.equal(d.activities.length,8);
 assert.equal(Object.values(d.breakdown).reduce((a,b)=>a+b,0),d.budget);
 if(d.budget>budgetRanges[budget].max)assert.ok(tradeoffs.some(t=>t.includes('exceeds')));
 if(transport!=='either'&&transport!==d.mode)assert.ok(tradeoffs.some(t=>t.includes('alternative')));
 assert.ok(d.budget<=budgetRanges[budget].max,'available budget-compatible alternatives must win');
 }
 assert.ok(seen.size>=5);
});
test('flight preference explains trade-off at low budget and matches at high budget',()=>{
 assert.match(recommend({budget:0,transport:'plane',vibe:'party'}).tradeoffs.join(' '),/alternative/);
 assert.equal(recommend({budget:3,transport:'plane',vibe:'party'}).destination.name,'Amsterdam');
});
test('different vibes lead to different budget-compatible trips',()=>{
 assert.equal(recommend({budget:1,transport:'train',vibe:'party'}).destination.name,'Brussels');
 assert.equal(recommend({budget:1,transport:'train',vibe:'culture'}).destination.name,'Strasbourg');
 assert.equal(recommend({budget:1,transport:'train',vibe:'chill'}).destination.name,'Bruges');
});
test('email formatting rejects invalid inputs',()=>{
 for(const e of ['','a','a@b','a b@example.com','a@@example.com'])assert.equal(validEmail(e),false);
 for(const e of ['student@hec.edu','alex+trip@example.com',' alex@example.fr '])assert.equal(validEmail(e),true);
});
