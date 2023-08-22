function minCostToConnectRopes(ropes) {
    // Convert the input string to an array of integers
    const ropeLengths = ropes.split(',').map(Number);

    // Create a priority queue (min-heap) to store rope lengths
    const priorityQueue = new MinHeap();
    
    // Insert rope lengths into the priority queue
    for (let length of ropeLengths) {
        priorityQueue.insert(length);
    }

    let totalCost = 0;

    // Connect ropes until there's only one rope left in the priority queue
    while (priorityQueue.size() > 1) {
        const combinedLength = priorityQueue.extractMin() + priorityQueue.extractMin();
        totalCost += combinedLength;
        priorityQueue.insert(combinedLength);
    }

    return totalCost;
}

// MinHeap class implementation for the priority queue
class MinHeap {
    constructor() {
        this.heap = [];
    }

    insert(value) {
        this.heap.push(value);
        this.bubbleUp(this.heap.length - 1);
    }

    extractMin() {
        const min = this.heap[0];
        const last = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = last;
            this.sinkDown(0);
        }
        return min;
    }

    size() {
        return this.heap.length;
    }

    bubbleUp(index) {
        const parentIndex = Math.floor((index - 1) / 2);
        if (index > 0 && this.heap[parentIndex] > this.heap[index]) {
            [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
            this.bubbleUp(parentIndex);
        }
    }

    sinkDown(index) {
        const leftChildIndex = 2 * index + 1;
        const rightChildIndex = 2 * index + 2;
        let smallestIndex = index;

        if (leftChildIndex < this.heap.length && this.heap[leftChildIndex] < this.heap[smallestIndex]) {
            smallestIndex = leftChildIndex;
        }

        if (rightChildIndex < this.heap.length && this.heap[rightChildIndex] < this.heap[smallestIndex]) {
            smallestIndex = rightChildIndex;
        }

        if (smallestIndex !== index) {
            [this.heap[index], this.heap[smallestIndex]] = [this.heap[smallestIndex], this.heap[index]];
            this.sinkDown(smallestIndex);
        }
    }
}

// Get the input string from the user
const input = prompt("Enter comma-separated rope lengths:");

// Calculate the minimum cost to connect the ropes
const minCost = minCostToConnectRopes(input);

// Display the result in the specified <div> element
const resultDiv = document.getElementById("result");
resultDiv.textContent = minCost;