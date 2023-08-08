const portal_5 = () => ({
    rooms: [
        {
            id: 'portal_5', // unique ID for this room
            name: 'Portal 5', // room name (shown when player enters the room)
            // room description (shown when player first enters the room)
            desc: `Portal 5's room. It is rather empty except for an orb floating in the middle of the room.`,
            onLook: () => {
                const room = getRoom('portal_5');
                room.desc = `Your eyes are drawn to a large, shimmering orb hovering in mid-air, its surface pulsing with a warm, golden light.
         The room around you is dimly lit, but the orb seems to fill the space with a comforting radiance.`;
            },
            items: [
                {
                    name: ['floating orb', 'orb'], // player can refer to this item by any of these names
                    desc: `Your eyes are drawn to a large, shimmering orb hovering in mid-air, its surface pulsing with a warm, golden light. 
          The room around you is dimly lit, but the orb seems to fill the space with a comforting radiance.`, // description shown when player looks at the item
                    block: `It's far too large for you to carry.`, // optional reason player cannot pick up this item
                }
            ],
            // places the player can go from this room
            exits: [
                // GO GLADE command leads back to the Glade
                { dir: 'glade', id: 'glade' },
            ],
        }
    ],
});