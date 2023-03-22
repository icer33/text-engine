const portal_1 = () => ({
  rooms: [
    {
      id: 'portal_1', // unique ID for this room
      name: 'Portal 1', // room name (shown when player enters the room)
      // room description (shown when player first enters the room)
      desc: `Portal 1's room.`,
      onLook: () => {
        const room = getRoom('portal_1');
        room.desc = `This is the room leading from portal1`;
      },
      items: [
        {
          name: 'tall window', // the item's name
          desc: `All you can see are puffy white clouds over a blue sky.`, // description shown when player looks at the item
        },
        {
          name: ['monstera', 'plant', 'swiss cheese'], // player can refer to this item by any of these names
          desc: `Sometimes called a Swiss Cheese plant, no office is complete without one. It has lovely, large leaves. This is the biggest you\'ve ever seen.

          There's **SOMETHING SHINY** in the pot.`,
          block: `It's far too large for you to carry.`, // optional reason player cannot pick up this item
          // when player looks at the plant, they discover a shiny object which turns out to be a key
          onLook: () => {
            if (getItem('shiny')) {
              // the key is already in the pot or the player's inventory
              return;
            }

            const foyer = getRoom('portal_1');

            // put the silver key in the pot
            foyer.items.push({
              name: ['shiny thing', 'something shiny', 'pot'],
              onUse() {
                const room = getRoom(disk.roomId);
                if (room.id === 'foyer') {
                  println(`There's nothing to unlock in the foyer.`);
                } else if (room.id === 'reception') {
                  println(`You unlock the door to the **EAST**!`);
                  // remove the block
                  const exit = getExit('east', room.exits);
                  delete exit.block;
                  // this item can only be used once
                  const key = getItem('shiny');
                  key.onUse = () => println(`The lab has already been unlocked.`);
                } else {
                  println(`There's nothing to unlock here.`);
                }
              },
              desc: `It's a silver **KEY**!`,
              onLook() {
                const key = getItem('shiny');

                // now that we know it's a key, place that name first so the engine calls it by that name
                key.name.unshift('silver key');

                // let's also update the description
                key.desc = `It has a blue cap with the word "LAB" printed on it.`;

                // remove this method (we don't need it anymore)
                delete key.onLook;
              },
              isTakeable: true,
              onTake() {
                println(`You took it.`);
                // update the monstera's description, removing everything starting at the line break
                const plant = getItem('plant');
                plant.desc = plant.desc.slice(0, plant.desc.indexOf('\n'));
              },
            });
          },
        },
        {
          name: 'dime',
          desc: `Wow, ten cents.`,
          isTakeable: true, // allow the player to TAKE this item
          onTake: () => println(`You bend down and pick up the tiny, shiny coin.

          *Now it's in your **inventory**, and you can use it at any time, in any room. (Don't spend it all in one place!)

          Type **INV** to see a list of items in your inventory.*`),
          // using the dime randomly prints HEADS or TAILS
          onUse() {
            const side = Math.random() > 0.5 ? 'HEADS' : 'TAILS';
            println(`You flip the dime. It lands on ${side}.`);
          },
        }
      ],
      // places the player can go from this room
      exits: [
        // GO NORTH command leads to the Reception Desk
        { dir: 'north', id: 'reception' },
      ],
    }
  ],
});