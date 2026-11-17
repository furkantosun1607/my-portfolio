// Selected, shortened topic names from wiki/entities. Connections are illustrative;
// no internal document content or infrastructure configuration is included.
export const wikiTopics = [
  "ağ-yapısı",
  "switch-envanteri",
  "meraki-ap",
  "yazıcı-envanteri",
  "ağ-komutları",
  "arıza-takip",
  "kamera-sistemi",
] as const;

export type WikiNode = {
  x: number;
  y: number;
  radius: number;
  phase: number;
  group: number;
  label?: string;
};

export function createWikiGraph() {
  let seed = 7126;
  const random = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  const nodes: WikiNode[] = [{ x: 0, y: 0, radius: 7, phase: 0, group: -1, label: "SutasGPT" }];
  const edges: [number, number][] = [];

  wikiTopics.forEach((label, group) => {
    const angle = (group / wikiTopics.length) * Math.PI * 2 - 1.35;
    const anchor = nodes.length;
    const centerX = Math.cos(angle) * (0.48 + random() * 0.13);
    const centerY = Math.sin(angle) * (0.48 + random() * 0.13);
    nodes.push({ x: centerX, y: centerY, radius: 3.7, phase: random() * 6, group, label });
    edges.push([0, anchor]);

    for (let i = 0; i < 15; i++) {
      const orbit = random() * Math.PI * 2;
      const distance = Math.sqrt(random()) * 0.32;
      const index = nodes.length;
      nodes.push({
        x: centerX + Math.cos(orbit) * distance,
        y: centerY + Math.sin(orbit) * distance,
        radius: 1.2 + random() * 1.9,
        phase: random() * Math.PI * 2,
        group,
      });
      edges.push([anchor, index]);
      if (i > 0) edges.push([index - 1, index]);
      if (i > 3) edges.push([index - 3, index]);
    }
    if (group > 0) edges.push([anchor - 16, anchor]);
  });
  edges.push([1, 97], [17, 65], [33, 81], [49, 97], [1, 49], [17, 81]);
  return { nodes, edges };
}
