const Command = require('command')
module.exports = function HalloweenEveryday(dispatch) {
	const command = Command(dispatch)
	let halloween = require('./halloween.json'),
		huntingZoneId = [183, 84, 83, 81, 80, 79, 78, 77, 76, 75, 74, 73, 72, 71, 70, 69, 68, 67, 66, 65, 63, 62, 61, 60, 59],
		enabled = true,
		spawned = false

	command.add('halloween', () => {
		enabled = !enabled
		command.message(`${enabled ? 'Halloween is here!' : 'Rip halloween :c'}`)
	})

	dispatch.hook('S_SPAWN_NPC', 4, event => {
		if (spawned === false && enabled && huntingZoneId.includes(event.huntingZoneId)) {
			spawned = true
			for (i in halloween[event.huntingZoneId]) {
				i = halloween[event.huntingZoneId][i]
				S_SPAWN_NPC(i.id, i.x, i.y, i.z, i.w, i.templateId, event.huntingZoneId)
			}
		}
	})

	dispatch.hook('S_LOAD_TOPO', 2, event => {
		spawned = false
	})

	function S_SPAWN_NPC(id, x, y, z, w, templateId, huntingZoneId) {
		dispatch.toClient('S_SPAWN_NPC', 4, {
			id: id,
			target: { low: 0, high: 0 },
			x: x,
			y: y,
			z: z,
			w: w,
			relation: 12,
			templateId: templateId,
			huntingZoneId: huntingZoneId,
			unk4: 0,
			unk5: 0,
			unk6: 0,
			unk7: 5,
			visible: true,
			villager: true,
			spawnType: 1,
			unk11: { low: 0, high: 0 },
			unk12: 0,
			unk13: 0,
			unk14: 0,
			unk15: 0,
			owner: { low: 0, high: 0 },
			unk16: 0,
			unk17: 0,
			unk18: { low: 0, high: 0 },
			unk19: 0,
			unk20: 16777216,
			unk25: 16777216,
			unk22: [],
			unk24: [],
			npcName: ''
		})
	}
}
