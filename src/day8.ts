enum Part {
    ChildCount,
    MetadataCount,
    Data
}

class Node {
    children: Node[];
    metadata: number[];
    childrenLeft: number;
    metadataLeft: number;

    constructor() {
        this.children = Array();
        this.metadata = Array();
        this.childrenLeft = 0;
        this.metadataLeft = 0;
    }

    addChild(child: Node) {
        this.children.push(child);
        this.childrenLeft--;
    }

    addMetadata(metadata: number) {
        this.metadata.push(metadata);
        this.metadataLeft--;
    }
}

function part2(node: Node): number {
    return node.children.length == 0
        ? node.metadata.reduce((a, b) => a + b)
        : node.metadata.reduce(
              (acc, x) =>
                  x - 1 >= 0 && x - 1 < node.children.length
                      ? acc + part2(node.children[x - 1])
                      : acc,
              0
          );
}

export function solve(input: string) {
    let data = input.split(' ').map(x => parseInt(x));
    let tree = new Node();

    let currentPart = Part.ChildCount;
    let current = tree;
    let parents = Array();

    let sum = 0;

    data.forEach(number => {
        if (currentPart == Part.ChildCount) {
            current.childrenLeft = number;
            currentPart++;
        } else if (currentPart == Part.MetadataCount) {
            current.metadataLeft = number;
            currentPart++;
        } else if (currentPart == Part.Data && current.childrenLeft > 0) {
            const child = new Node();
            current.addChild(child);
            parents.push(current);
            current = child;
            currentPart = Part.MetadataCount;
            current.childrenLeft = number;
        } else if (current.metadataLeft > 0) {
            current.addMetadata(number);
            sum += number;
            if (current.metadataLeft == 0) current = parents.pop();
        }
    });

    return {
        part1: sum,
        part2: part2(tree)
    };
}
