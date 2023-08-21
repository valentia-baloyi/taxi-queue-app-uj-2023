import * as sqlite from 'sqlite';
import sqlite3 from 'sqlite3';

const  db = await sqlite.open({
    filename:  './taxi_queue.db',
    driver:  sqlite3.Database
});

await db.migrate();

export async function joinQueue() {
    // console.log('join queue')
    await db.run('INSERT INTO regular_queue (timestamp) VALUES (?)', Date.now());
}

export async function leaveQueue() 
    const lastEntry = await db.get('SELECT MAX(timestamp) AS last_timestamp FROM regular_queue');
    if (lastEntry) {
        await db.run('DELETE FROM regular_queue WHERE timestamp = ?', lastEntry.last_timestamp);
}

export async function joinTaxiQueue() {
    await db.run('INSERT INTO taxi_queue (timestamp) VALUES (?)', Date.now());
   
}

export async function queueLength() {
    const result = await db.get('SELECT COUNT(*) AS count FROM regular_queue');
    return result.count;
       
}

export async function taxiQueueLength() {
    const result = await db.get('SELECT COUNT(*) AS count FROM taxi_queue');
    return result.count;

}


export function taxiDepart() 
    db.get ('SELECT MIN(timestamp) AS oldest_timestamp FROM taxi_queue', async (err, result) => {
        if (!err && result && result.oldest_timestamp) {
            await db.run('DELETE FROM taxi_queue WHERE timestamp = ?', result.oldest_timestamp);
        }
    });

