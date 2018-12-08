enum Header {
    Child,
    Metadata,
    Data
}

class Node {
    children: Node[];
    childrenCount: number;
    metadata: number[];
    metadataCount: number;
    parent: Node | undefined;

    constructor() {
        this.children = Array();
        this.metadata = Array();
        this.childrenCount = 0;
        this.metadataCount = 0;
    }

    addChild(child: Node) {
        this.children.push(child);
    }

    addMetadata(metadata: number) {
        this.metadata.push(metadata);
    }
}

function part2(node: Node): number {
    if (node.children.length == 0) {
        return node.metadata.reduce((a, b) => a + b);
    } else {
        let sum = 0;
        node.metadata.forEach(index => {
            if (index - 1 >= 0 && index - 1 < node.children.length) {
                sum += part2(node.children[index - 1]); 
            }
        });
        
        return sum;
    }
}

export function solve(input: string) {
    let data = input.split(' ').map(x => parseInt(x));
    let tree = new Node();

    let current = Header.Child;
    let currentNode = tree;
    let parents = Array();

    let sum = 0;

    for (let i = 0; i < data.length; i++) {
        if (current == Header.Child) {
            currentNode.childrenCount = data[i];
        } else if (current == Header.Metadata) {
            currentNode.metadataCount = data[i];
        }

        if (current == Header.Child) {
            current = Header.Metadata;
            continue;
        } else if (current == Header.Metadata) {
            current = Header.Data;
            continue;
        }

        if (current == Header.Data && currentNode.childrenCount > 0) {
            current = Header.Child;
            i--;
            currentNode.childrenCount--;
            currentNode.addChild(new Node());
            parents.push(currentNode);
            currentNode = currentNode.children[currentNode.children.length - 1];
        } else if (
            current == Header.Data &&
            currentNode.childrenCount == 0
        ) {
            if (currentNode.metadataCount > 0) {
                currentNode.addMetadata(data[i]);
                sum += data[i];
                currentNode.metadataCount--;
            } else {
                if (parents.length > 0) {
                    currentNode = parents.pop();
                    i--;
                }
            }
        }
    }

    return {
        part1: sum,
        part2: part2(tree)
    };
}
