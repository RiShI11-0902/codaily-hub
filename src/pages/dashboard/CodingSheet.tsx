import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, ExternalLink } from "lucide-react";
import useUserStore from "@/store/store";


const CodingSheet = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [selectedSheet, setSelectedSheet] = useState<any>(null);
  const { addQuestions, solvedQ } = useUserStore()
  const [completed, setCompleted] = useState({
    Sheet: null
  })

  const getCount = (sheetName) => {
    return solvedQ.filter((ele) => ele?.sheet === sheetName).length
  }

  const result = {
    message: "Coding sheet data loaded successfully",
    sheets: [
      {
        id: 1,
        name: "Arrays",
        problems: 50,
        completed: getCount('Arrays'),
        questions: [
          { title: "Two Sum", id: 1, url: "https://leetcode.com/problems/two-sum/" },
          { title: "Best Time to Buy and Sell Stock", id: 121, url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" },
          { title: "Contains Duplicate", id: 217, url: "https://leetcode.com/problems/contains-duplicate/" },
          { title: "Product of Array Except Self", id: 238, url: "https://leetcode.com/problems/product-of-array-except-self/" },
          { title: "Maximum Subarray", id: 53, url: "https://leetcode.com/problems/maximum-subarray/" },
          { title: "Maximum Product Subarray", id: 152, url: "https://leetcode.com/problems/maximum-product-subarray/" },
          { title: "Find Minimum in Rotated Sorted Array", id: 153, url: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/" },
          { title: "Search in Rotated Sorted Array", id: 33, url: "https://leetcode.com/problems/search-in-rotated-sorted-array/" },
          { title: "3Sum", id: 15, url: "https://leetcode.com/problems/3sum/" },
          { title: "Container With Most Water", id: 11, url: "https://leetcode.com/problems/container-with-most-water/" },
          { title: "Remove Duplicates from Sorted Array", id: 26, url: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/" },
          { title: "Remove Element", id: 27, url: "https://leetcode.com/problems/remove-element/" },
          { title: "Search Insert Position", id: 35, url: "https://leetcode.com/problems/search-insert-position/" },
          { title: "Merge Sorted Array", id: 88, url: "https://leetcode.com/problems/merge-sorted-array/" },
          { title: "Pascal's Triangle", id: 118, url: "https://leetcode.com/problems/pascals-triangle/" },
          { title: "Pascal's Triangle II", id: 119, url: "https://leetcode.com/problems/pascals-triangle-ii/" },
          { title: "Single Number", id: 136, url: "https://leetcode.com/problems/single-number/" },
          { title: "Majority Element", id: 169, url: "https://leetcode.com/problems/majority-element/" },
          { title: "Rotate Array", id: 189, url: "https://leetcode.com/problems/rotate-array/" },
          { title: "Missing Number", id: 268, url: "https://leetcode.com/problems/missing-number/" },
          { title: "Move Zeroes", id: 283, url: "https://leetcode.com/problems/move-zeroes/" },
          { title: "Find All Numbers Disappeared in an Array", id: 448, url: "https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/" },
          { title: "Third Maximum Number", id: 414, url: "https://leetcode.com/problems/third-maximum-number/" },
          { title: "Array Partition", id: 561, url: "https://leetcode.com/problems/array-partition/" },
          { title: "Reshape the Matrix", id: 566, url: "https://leetcode.com/problems/reshape-the-matrix/" },
          { title: "Can Place Flowers", id: 605, url: "https://leetcode.com/problems/can-place-flowers/" },
          { title: "Maximum Average Subarray I", id: 643, url: "https://leetcode.com/problems/maximum-average-subarray-i/" },
          { title: "Non-decreasing Array", id: 665, url: "https://leetcode.com/problems/non-decreasing-array/" },
          { title: "Two Sum II - Input Array Is Sorted", id: 167, url: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/" },
          { title: "Squares of a Sorted Array", id: 977, url: "https://leetcode.com/problems/squares-of-a-sorted-array/" },
          { title: "Sort Colors", id: 75, url: "https://leetcode.com/problems/sort-colors/" },
          { title: "Merge Intervals", id: 56, url: "https://leetcode.com/problems/merge-intervals/" },
          { title: "Insert Interval", id: 57, url: "https://leetcode.com/problems/insert-interval/" },
          { title: "Next Permutation", id: 31, url: "https://leetcode.com/problems/next-permutation/" },
          { title: "Spiral Matrix", id: 54, url: "https://leetcode.com/problems/spiral-matrix/" },
          { title: "Jump Game", id: 55, url: "https://leetcode.com/problems/jump-game/" },
          { title: "Minimum Path Sum", id: 64, url: "https://leetcode.com/problems/minimum-path-sum/" },
          { title: "Set Matrix Zeroes", id: 73, url: "https://leetcode.com/problems/set-matrix-zeroes/" },
          { title: "Game of Life", id: 289, url: "https://leetcode.com/problems/game-of-life/" },
          { title: "Subarray Sum Equals K", id: 560, url: "https://leetcode.com/problems/subarray-sum-equals-k/" },
          { title: "Find Peak Element", id: 162, url: "https://leetcode.com/problems/find-peak-element/" },
          { title: "4Sum", id: 18, url: "https://leetcode.com/problems/4sum/" },
          { title: "Combination Sum", id: 39, url: "https://leetcode.com/problems/combination-sum/" },
          { title: "Permutations", id: 46, url: "https://leetcode.com/problems/permutations/" },
          { title: "Rotate Image", id: 48, url: "https://leetcode.com/problems/rotate-image/" },
          { title: "Group Anagrams", id: 49, url: "https://leetcode.com/problems/group-anagrams/" },
          { title: "Trapping Rain Water", id: 42, url: "https://leetcode.com/problems/trapping-rain-water/" },
          { title: "First Missing Positive", id: 41, url: "https://leetcode.com/problems/first-missing-positive/" },
          { title: "Longest Consecutive Sequence", id: 128, url: "https://leetcode.com/problems/longest-consecutive-sequence/" },
          { title: "Find the Duplicate Number", id: 287, url: "https://leetcode.com/problems/find-the-duplicate-number/" },
        ]
      },
      {
        id: 2,
        name: "Strings",
        problems: 50,
        completed: getCount('Strings'),
        questions: [
          { title: "Valid Anagram", id: 242, url: "https://leetcode.com/problems/valid-anagram/" },
          { title: "Valid Palindrome", id: 125, url: "https://leetcode.com/problems/valid-palindrome/" },
          { title: "Longest Substring Without Repeating Characters", id: 3, url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
          { title: "Longest Repeating Character Replacement", id: 424, url: "https://leetcode.com/problems/longest-repeating-character-replacement/" },
          { title: "Minimum Window Substring", id: 76, url: "https://leetcode.com/problems/minimum-window-substring/" },
          { title: "Group Anagrams", id: 49, url: "https://leetcode.com/problems/group-anagrams/" },
          { title: "Valid Parentheses", id: 20, url: "https://leetcode.com/problems/valid-parentheses/" },
          { title: "Longest Palindromic Substring", id: 5, url: "https://leetcode.com/problems/longest-palindromic-substring/" },
          { title: "Palindromic Substrings", id: 647, url: "https://leetcode.com/problems/palindromic-substrings/" },
          { title: "Encode and Decode Strings", id: 271, url: "https://leetcode.com/problems/encode-and-decode-strings/" },
          { title: "Roman to Integer", id: 13, url: "https://leetcode.com/problems/roman-to-integer/" },
          { title: "Integer to Roman", id: 12, url: "https://leetcode.com/problems/integer-to-roman/" },
          { title: "Implement strStr()", id: 28, url: "https://leetcode.com/problems/implement-strstr/" },
          { title: "Length of Last Word", id: 58, url: "https://leetcode.com/problems/length-of-last-word/" },
          { title: "Add Binary", id: 67, url: "https://leetcode.com/problems/add-binary/" },
          { title: "Reverse Words in a String", id: 151, url: "https://leetcode.com/problems/reverse-words-in-a-string/" },
          { title: "Reverse String", id: 344, url: "https://leetcode.com/problems/reverse-string/" },
          { title: "Reverse Vowels of a String", id: 345, url: "https://leetcode.com/problems/reverse-vowels-of-a-string/" },
          { title: "Isomorphic Strings", id: 205, url: "https://leetcode.com/problems/isomorphic-strings/" },
          { title: "Word Pattern", id: 290, url: "https://leetcode.com/problems/word-pattern/" },
          { title: "Ransom Note", id: 383, url: "https://leetcode.com/problems/ransom-note/" },
          { title: "First Unique Character in a String", id: 387, url: "https://leetcode.com/problems/first-unique-character-in-a-string/" },
          { title: "Valid Palindrome II", id: 680, url: "https://leetcode.com/problems/valid-palindrome-ii/" },
          { title: "Longest Common Prefix", id: 14, url: "https://leetcode.com/problems/longest-common-prefix/" },
          { title: "String to Integer (atoi)", id: 8, url: "https://leetcode.com/problems/string-to-integer-atoi/" },
          { title: "ZigZag Conversion", id: 6, url: "https://leetcode.com/problems/zigzag-conversion/" },
          { title: "Count and Say", id: 38, url: "https://leetcode.com/problems/count-and-say/" },
          { title: "Letter Combinations of a Phone Number", id: 17, url: "https://leetcode.com/problems/letter-combinations-of-a-phone-number/" },
          { title: "Generate Parentheses", id: 22, url: "https://leetcode.com/problems/generate-parentheses/" },
          { title: "Multiply Strings", id: 43, url: "https://leetcode.com/problems/multiply-strings/" },
          { title: "Simplify Path", id: 71, url: "https://leetcode.com/problems/simplify-path/" },
          { title: "Edit Distance", id: 72, url: "https://leetcode.com/problems/edit-distance/" },
          { title: "Decode Ways", id: 91, url: "https://leetcode.com/problems/decode-ways/" },
          { title: "Restore IP Addresses", id: 93, url: "https://leetcode.com/problems/restore-ip-addresses/" },
          { title: "Interleaving String", id: 97, url: "https://leetcode.com/problems/interleaving-string/" },
          { title: "Distinct Subsequences", id: 115, url: "https://leetcode.com/problems/distinct-subsequences/" },
          { title: "Word Ladder", id: 127, url: "https://leetcode.com/problems/word-ladder/" },
          { title: "Word Break", id: 139, url: "https://leetcode.com/problems/word-break/" },
          { title: "Compare Version Numbers", id: 165, url: "https://leetcode.com/problems/compare-version-numbers/" },
          { title: "Repeated DNA Sequences", id: 187, url: "https://leetcode.com/problems/repeated-dna-sequences/" },
          { title: "Basic Calculator", id: 224, url: "https://leetcode.com/problems/basic-calculator/" },
          { title: "Basic Calculator II", id: 227, url: "https://leetcode.com/problems/basic-calculator-ii/" },
          { title: "Different Ways to Add Parentheses", id: 241, url: "https://leetcode.com/problems/different-ways-to-add-parentheses/" },
          { title: "Remove Duplicate Letters", id: 316, url: "https://leetcode.com/problems/remove-duplicate-letters/" },
          { title: "Decode String", id: 394, url: "https://leetcode.com/problems/decode-string/" },
          { title: "String Compression", id: 443, url: "https://leetcode.com/problems/string-compression/" },
          { title: "Longest Uncommon Subsequence II", id: 522, url: "https://leetcode.com/problems/longest-uncommon-subsequence-ii/" },
          { title: "Detect Capital", id: 520, url: "https://leetcode.com/problems/detect-capital/" },
          { title: "Reverse String II", id: 541, url: "https://leetcode.com/problems/reverse-string-ii/" },
          { title: "Reverse Only Letters", id: 917, url: "https://leetcode.com/problems/reverse-only-letters/" },
        ]
      },
      {
        id: 3,
        name: "Linked Lists",
        problems: 50,
        completed: getCount('Linked Lists'),
        questions: [
          { title: "Reverse Linked List", id: 206, url: "https://leetcode.com/problems/reverse-linked-list/" },
          { title: "Merge Two Sorted Lists", id: 21, url: "https://leetcode.com/problems/merge-two-sorted-lists/" },
          { title: "Linked List Cycle", id: 141, url: "https://leetcode.com/problems/linked-list-cycle/" },
          { title: "Linked List Cycle II", id: 142, url: "https://leetcode.com/problems/linked-list-cycle-ii/" },
          { title: "Remove Nth Node From End of List", id: 19, url: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/" },
          { title: "Reorder List", id: 143, url: "https://leetcode.com/problems/reorder-list/" },
          { title: "Palindrome Linked List", id: 234, url: "https://leetcode.com/problems/palindrome-linked-list/" },
          { title: "Middle of the Linked List", id: 876, url: "https://leetcode.com/problems/middle-of-the-linked-list/" },
          { title: "Delete Node in a Linked List", id: 237, url: "https://leetcode.com/problems/delete-node-in-a-linked-list/" },
          { title: "Remove Duplicates from Sorted List", id: 83, url: "https://leetcode.com/problems/remove-duplicates-from-sorted-list/" },
          { title: "Remove Duplicates from Sorted List II", id: 82, url: "https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/" },
          { title: "Intersection of Two Linked Lists", id: 160, url: "https://leetcode.com/problems/intersection-of-two-linked-lists/" },
          { title: "Reverse Linked List II", id: 92, url: "https://leetcode.com/problems/reverse-linked-list-ii/" },
          { title: "Swap Nodes in Pairs", id: 24, url: "https://leetcode.com/problems/swap-nodes-in-pairs/" },
          { title: "Odd Even Linked List", id: 328, url: "https://leetcode.com/problems/odd-even-linked-list/" },
          { title: "Add Two Numbers", id: 2, url: "https://leetcode.com/problems/add-two-numbers/" },
          { title: "Add Two Numbers II", id: 445, url: "https://leetcode.com/problems/add-two-numbers-ii/" },
          { title: "Copy List with Random Pointer", id: 138, url: "https://leetcode.com/problems/copy-list-with-random-pointer/" },
          { title: "Flatten a Multilevel Doubly Linked List", id: 430, url: "https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/" },
          { title: "Rotate List", id: 61, url: "https://leetcode.com/problems/rotate-list/" },
          { title: "Partition List", id: 86, url: "https://leetcode.com/problems/partition-list/" },
          { title: "Sort List", id: 148, url: "https://leetcode.com/problems/sort-list/" },
          { title: "Insertion Sort List", id: 147, url: "https://leetcode.com/problems/insertion-sort-list/" },
          { title: "Convert Sorted List to Binary Search Tree", id: 109, url: "https://leetcode.com/problems/convert-sorted-list-to-binary-search-tree/" },
          { title: "Merge k Sorted Lists", id: 23, url: "https://leetcode.com/problems/merge-k-sorted-lists/" },
          { title: "Reverse Nodes in k-Group", id: 25, url: "https://leetcode.com/problems/reverse-nodes-in-k-group/" },
          { title: "Design Linked List", id: 707, url: "https://leetcode.com/problems/design-linked-list/" },
          { title: "Remove Linked List Elements", id: 203, url: "https://leetcode.com/problems/remove-linked-list-elements/" },
          { title: "Split Linked List in Parts", id: 725, url: "https://leetcode.com/problems/split-linked-list-in-parts/" },
          { title: "Next Greater Node In Linked List", id: 1019, url: "https://leetcode.com/problems/next-greater-node-in-linked-list/" },
          { title: "Remove Zero Sum Consecutive Nodes", id: 1171, url: "https://leetcode.com/problems/remove-zero-sum-consecutive-nodes-from-linked-list/" },
          { title: "Convert Binary Number in a Linked List to Integer", id: 1290, url: "https://leetcode.com/problems/convert-binary-number-in-a-linked-list-to-integer/" },
          { title: "Delete N Nodes After M Nodes", id: 1474, url: "https://leetcode.com/problems/delete-n-nodes-after-m-nodes-of-a-linked-list/" },
          { title: "Merge In Between Linked Lists", id: 1669, url: "https://leetcode.com/problems/merge-in-between-linked-lists/" },
          { title: "Swapping Nodes in a Linked List", id: 1721, url: "https://leetcode.com/problems/swapping-nodes-in-a-linked-list/" },
          { title: "Maximum Twin Sum of a Linked List", id: 2130, url: "https://leetcode.com/problems/maximum-twin-sum-of-a-linked-list/" },
          { title: "Delete the Middle Node of a Linked List", id: 2095, url: "https://leetcode.com/problems/delete-the-middle-node-of-a-linked-list/" },
          { title: "LRU Cache", id: 146, url: "https://leetcode.com/problems/lru-cache/" },
          { title: "LFU Cache", id: 460, url: "https://leetcode.com/problems/lfu-cache/" },
          { title: "All O`one Data Structure", id: 432, url: "https://leetcode.com/problems/all-oone-data-structure/" },
          { title: "Design Browser History", id: 1472, url: "https://leetcode.com/problems/design-browser-history/" },
          { title: "Design Front Middle Back Queue", id: 1670, url: "https://leetcode.com/problems/design-front-middle-back-queue/" },
          { title: "Design Circular Queue", id: 622, url: "https://leetcode.com/problems/design-circular-queue/" },
          { title: "Design Circular Deque", id: 641, url: "https://leetcode.com/problems/design-circular-deque/" },
          { title: "Find the Minimum and Maximum Number of Nodes Between Critical Points", id: 2058, url: "https://leetcode.com/problems/find-the-minimum-and-maximum-number-of-nodes-between-critical-points/" },
          { title: "Reverse Nodes in Even Length Groups", id: 2074, url: "https://leetcode.com/problems/reverse-nodes-in-even-length-groups/" },
          { title: "Double a Number Represented as a Linked List", id: 2816, url: "https://leetcode.com/problems/double-a-number-represented-as-a-linked-list/" },
          { title: "Add Two Polynomials Represented as Linked Lists", id: 1634, url: "https://leetcode.com/problems/add-two-polynomials-represented-as-linked-lists/" },
          { title: "Plus One Linked List", id: 369, url: "https://leetcode.com/problems/plus-one-linked-list/" },
          { title: "Linked List Random Node", id: 382, url: "https://leetcode.com/problems/linked-list-random-node/" },
        ]
      },
      {
        id: 4,
        name: "Trees & Graphs",
        problems: 50,
        completed: getCount('Trees & Graphs'),
        questions: [
          { title: "Binary Tree Inorder Traversal", id: 94, url: "https://leetcode.com/problems/binary-tree-inorder-traversal/" },
          { title: "Maximum Depth of Binary Tree", id: 104, url: "https://leetcode.com/problems/maximum-depth-of-binary-tree/" },
          { title: "Same Tree", id: 100, url: "https://leetcode.com/problems/same-tree/" },
          { title: "Invert Binary Tree", id: 226, url: "https://leetcode.com/problems/invert-binary-tree/" },
          { title: "Binary Tree Level Order Traversal", id: 102, url: "https://leetcode.com/problems/binary-tree-level-order-traversal/" },
          { title: "Validate Binary Search Tree", id: 98, url: "https://leetcode.com/problems/validate-binary-search-tree/" },
          { title: "Kth Smallest Element in a BST", id: 230, url: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/" },
          { title: "Lowest Common Ancestor of BST", id: 235, url: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/" },
          { title: "Lowest Common Ancestor of Binary Tree", id: 236, url: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/" },
          { title: "Binary Tree Right Side View", id: 199, url: "https://leetcode.com/problems/binary-tree-right-side-view/" },
          { title: "Count Good Nodes in Binary Tree", id: 1448, url: "https://leetcode.com/problems/count-good-nodes-in-binary-tree/" },
          { title: "Subtree of Another Tree", id: 572, url: "https://leetcode.com/problems/subtree-of-another-tree/" },
          { title: "Diameter of Binary Tree", id: 543, url: "https://leetcode.com/problems/diameter-of-binary-tree/" },
          { title: "Balanced Binary Tree", id: 110, url: "https://leetcode.com/problems/balanced-binary-tree/" },
          { title: "Symmetric Tree", id: 101, url: "https://leetcode.com/problems/symmetric-tree/" },
          { title: "Path Sum", id: 112, url: "https://leetcode.com/problems/path-sum/" },
          { title: "Path Sum II", id: 113, url: "https://leetcode.com/problems/path-sum-ii/" },
          { title: "Binary Tree Paths", id: 257, url: "https://leetcode.com/problems/binary-tree-paths/" },
          { title: "Sum Root to Leaf Numbers", id: 129, url: "https://leetcode.com/problems/sum-root-to-leaf-numbers/" },
          { title: "Binary Tree Maximum Path Sum", id: 124, url: "https://leetcode.com/problems/binary-tree-maximum-path-sum/" },
          { title: "Construct Binary Tree from Preorder and Inorder", id: 105, url: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/" },
          { title: "Construct Binary Tree from Inorder and Postorder", id: 106, url: "https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/" },
          { title: "Serialize and Deserialize Binary Tree", id: 297, url: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/" },
          { title: "Number of Islands", id: 200, url: "https://leetcode.com/problems/number-of-islands/" },
          { title: "Clone Graph", id: 133, url: "https://leetcode.com/problems/clone-graph/" },
          { title: "Pacific Atlantic Water Flow", id: 417, url: "https://leetcode.com/problems/pacific-atlantic-water-flow/" },
          { title: "Course Schedule", id: 207, url: "https://leetcode.com/problems/course-schedule/" },
          { title: "Course Schedule II", id: 210, url: "https://leetcode.com/problems/course-schedule-ii/" },
          { title: "Graph Valid Tree", id: 261, url: "https://leetcode.com/problems/graph-valid-tree/" },
          { title: "Number of Connected Components", id: 323, url: "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/" },
          { title: "Word Search", id: 79, url: "https://leetcode.com/problems/word-search/" },
          { title: "Surrounded Regions", id: 130, url: "https://leetcode.com/problems/surrounded-regions/" },
          { title: "Populating Next Right Pointers", id: 116, url: "https://leetcode.com/problems/populating-next-right-pointers-in-each-node/" },
          { title: "Flatten Binary Tree to Linked List", id: 114, url: "https://leetcode.com/problems/flatten-binary-tree-to-linked-list/" },
          { title: "Binary Tree Zigzag Level Order", id: 103, url: "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/" },
          { title: "Minimum Height Trees", id: 310, url: "https://leetcode.com/problems/minimum-height-trees/" },
          { title: "Find Duplicate Subtrees", id: 652, url: "https://leetcode.com/problems/find-duplicate-subtrees/" },
          { title: "All Nodes Distance K", id: 863, url: "https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/" },
          { title: "Redundant Connection", id: 684, url: "https://leetcode.com/problems/redundant-connection/" },
          { title: "Network Delay Time", id: 743, url: "https://leetcode.com/problems/network-delay-time/" },
          { title: "Cheapest Flights Within K Stops", id: 787, url: "https://leetcode.com/problems/cheapest-flights-within-k-stops/" },
          { title: "Find Eventual Safe States", id: 802, url: "https://leetcode.com/problems/find-eventual-safe-states/" },
          { title: "Longest Increasing Path in Matrix", id: 329, url: "https://leetcode.com/problems/longest-increasing-path-in-a-matrix/" },
          { title: "Alien Dictionary", id: 269, url: "https://leetcode.com/problems/alien-dictionary/" },
          { title: "Word Ladder II", id: 126, url: "https://leetcode.com/problems/word-ladder-ii/" },
          { title: "Minimum Spanning Tree", id: 1584, url: "https://leetcode.com/problems/min-cost-to-connect-all-points/" },
          { title: "Critical Connections in Network", id: 1192, url: "https://leetcode.com/problems/critical-connections-in-a-network/" },
          { title: "Accounts Merge", id: 721, url: "https://leetcode.com/problems/accounts-merge/" },
          { title: "Swim in Rising Water", id: 778, url: "https://leetcode.com/problems/swim-in-rising-water/" },
          { title: "Bus Routes", id: 815, url: "https://leetcode.com/problems/bus-routes/" },
        ]
      },
      {
        id: 5,
        name: "Dynamic Programming",
        problems: 50,
        completed: getCount('Dynamic Programming'),
        questions: [
          { title: "Climbing Stairs", id: 70, url: "https://leetcode.com/problems/climbing-stairs/" },
          { title: "House Robber", id: 198, url: "https://leetcode.com/problems/house-robber/" },
          { title: "House Robber II", id: 213, url: "https://leetcode.com/problems/house-robber-ii/" },
          { title: "Coin Change", id: 322, url: "https://leetcode.com/problems/coin-change/" },
          { title: "Coin Change II", id: 518, url: "https://leetcode.com/problems/coin-change-ii/" },
          { title: "Longest Increasing Subsequence", id: 300, url: "https://leetcode.com/problems/longest-increasing-subsequence/" },
          { title: "Longest Common Subsequence", id: 1143, url: "https://leetcode.com/problems/longest-common-subsequence/" },
          { title: "Word Break", id: 139, url: "https://leetcode.com/problems/word-break/" },
          { title: "Word Break II", id: 140, url: "https://leetcode.com/problems/word-break-ii/" },
          { title: "Combination Sum IV", id: 377, url: "https://leetcode.com/problems/combination-sum-iv/" },
          { title: "Decode Ways", id: 91, url: "https://leetcode.com/problems/decode-ways/" },
          { title: "Unique Paths", id: 62, url: "https://leetcode.com/problems/unique-paths/" },
          { title: "Unique Paths II", id: 63, url: "https://leetcode.com/problems/unique-paths-ii/" },
          { title: "Jump Game", id: 55, url: "https://leetcode.com/problems/jump-game/" },
          { title: "Jump Game II", id: 45, url: "https://leetcode.com/problems/jump-game-ii/" },
          { title: "Partition Equal Subset Sum", id: 416, url: "https://leetcode.com/problems/partition-equal-subset-sum/" },
          { title: "Target Sum", id: 494, url: "https://leetcode.com/problems/target-sum/" },
          { title: "0/1 Knapsack (Partition)", id: 698, url: "https://leetcode.com/problems/partition-to-k-equal-sum-subsets/" },
          { title: "Best Time to Buy and Sell Stock", id: 121, url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" },
          { title: "Best Time to Buy and Sell Stock II", id: 122, url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/" },
          { title: "Best Time to Buy and Sell Stock III", id: 123, url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/" },
          { title: "Best Time to Buy and Sell Stock IV", id: 188, url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/" },
          { title: "Best Time to Buy and Sell with Cooldown", id: 309, url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/" },
          { title: "Best Time to Buy and Sell with Fee", id: 714, url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/" },
          { title: "Palindromic Substrings", id: 647, url: "https://leetcode.com/problems/palindromic-substrings/" },
          { title: "Longest Palindromic Substring", id: 5, url: "https://leetcode.com/problems/longest-palindromic-substring/" },
          { title: "Longest Palindromic Subsequence", id: 516, url: "https://leetcode.com/problems/longest-palindromic-subsequence/" },
          { title: "Edit Distance", id: 72, url: "https://leetcode.com/problems/edit-distance/" },
          { title: "Distinct Subsequences", id: 115, url: "https://leetcode.com/problems/distinct-subsequences/" },
          { title: "Minimum Path Sum", id: 64, url: "https://leetcode.com/problems/minimum-path-sum/" },
          { title: "Triangle", id: 120, url: "https://leetcode.com/problems/triangle/" },
          { title: "Minimum Falling Path Sum", id: 931, url: "https://leetcode.com/problems/minimum-falling-path-sum/" },
          { title: "Maximum Product Subarray", id: 152, url: "https://leetcode.com/problems/maximum-product-subarray/" },
          { title: "Maximum Subarray", id: 53, url: "https://leetcode.com/problems/maximum-subarray/" },
          { title: "Maximum Sum Circular Subarray", id: 918, url: "https://leetcode.com/problems/maximum-sum-circular-subarray/" },
          { title: "Maximal Square", id: 221, url: "https://leetcode.com/problems/maximal-square/" },
          { title: "Perfect Squares", id: 279, url: "https://leetcode.com/problems/perfect-squares/" },
          { title: "Ugly Number II", id: 264, url: "https://leetcode.com/problems/ugly-number-ii/" },
          { title: "Count Square Submatrices", id: 1277, url: "https://leetcode.com/problems/count-square-submatrices-with-all-ones/" },
          { title: "Delete and Earn", id: 740, url: "https://leetcode.com/problems/delete-and-earn/" },
          { title: "Paint House", id: 256, url: "https://leetcode.com/problems/paint-house/" },
          { title: "Paint House II", id: 265, url: "https://leetcode.com/problems/paint-house-ii/" },
          { title: "Dungeon Game", id: 174, url: "https://leetcode.com/problems/dungeon-game/" },
          { title: "Wildcard Matching", id: 44, url: "https://leetcode.com/problems/wildcard-matching/" },
          { title: "Regular Expression Matching", id: 10, url: "https://leetcode.com/problems/regular-expression-matching/" },
          { title: "Interleaving String", id: 97, url: "https://leetcode.com/problems/interleaving-string/" },
          { title: "Burst Balloons", id: 312, url: "https://leetcode.com/problems/burst-balloons/" },
          { title: "Russian Doll Envelopes", id: 354, url: "https://leetcode.com/problems/russian-doll-envelopes/" },
          { title: "Longest Arithmetic Subsequence", id: 1027, url: "https://leetcode.com/problems/longest-arithmetic-subsequence/" },
          { title: "Stone Game", id: 877, url: "https://leetcode.com/problems/stone-game/" },
        ]
      },
      {
        id: 6,
        name: "Binary Search",
        problems: 50,
        completed: getCount('Binary Search'),
        questions: [
          { title: "Binary Search", id: 704, url: "https://leetcode.com/problems/binary-search/" },
          { title: "Search Insert Position", id: 35, url: "https://leetcode.com/problems/search-insert-position/" },
          { title: "First Bad Version", id: 278, url: "https://leetcode.com/problems/first-bad-version/" },
          { title: "Search in Rotated Sorted Array", id: 33, url: "https://leetcode.com/problems/search-in-rotated-sorted-array/" },
          { title: "Search in Rotated Sorted Array II", id: 81, url: "https://leetcode.com/problems/search-in-rotated-sorted-array-ii/" },
          { title: "Find Minimum in Rotated Sorted Array", id: 153, url: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/" },
          { title: "Find Minimum in Rotated Sorted Array II", id: 154, url: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii/" },
          { title: "Find Peak Element", id: 162, url: "https://leetcode.com/problems/find-peak-element/" },
          { title: "Find First and Last Position", id: 34, url: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/" },
          { title: "Search a 2D Matrix", id: 74, url: "https://leetcode.com/problems/search-a-2d-matrix/" },
          { title: "Search a 2D Matrix II", id: 240, url: "https://leetcode.com/problems/search-a-2d-matrix-ii/" },
          { title: "Koko Eating Bananas", id: 875, url: "https://leetcode.com/problems/koko-eating-bananas/" },
          { title: "Capacity To Ship Packages", id: 1011, url: "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/" },
          { title: "Split Array Largest Sum", id: 410, url: "https://leetcode.com/problems/split-array-largest-sum/" },
          { title: "Median of Two Sorted Arrays", id: 4, url: "https://leetcode.com/problems/median-of-two-sorted-arrays/" },
          { title: "Find K Closest Elements", id: 658, url: "https://leetcode.com/problems/find-k-closest-elements/" },
          { title: "Guess Number Higher or Lower", id: 374, url: "https://leetcode.com/problems/guess-number-higher-or-lower/" },
          { title: "Valid Perfect Square", id: 367, url: "https://leetcode.com/problems/valid-perfect-square/" },
          { title: "Sqrt(x)", id: 69, url: "https://leetcode.com/problems/sqrtx/" },
          { title: "Pow(x, n)", id: 50, url: "https://leetcode.com/problems/powx-n/" },
          { title: "Arrange Coins", id: 441, url: "https://leetcode.com/problems/arranging-coins/" },
          { title: "Find Smallest Letter Greater Than Target", id: 744, url: "https://leetcode.com/problems/find-smallest-letter-greater-than-target/" },
          { title: "Peak Index in a Mountain Array", id: 852, url: "https://leetcode.com/problems/peak-index-in-a-mountain-array/" },
          { title: "Single Element in a Sorted Array", id: 540, url: "https://leetcode.com/problems/single-element-in-a-sorted-array/" },
          { title: "Time Based Key-Value Store", id: 981, url: "https://leetcode.com/problems/time-based-key-value-store/" },
          { title: "Minimum Size Subarray Sum", id: 209, url: "https://leetcode.com/problems/minimum-size-subarray-sum/" },
          { title: "Find the Duplicate Number", id: 287, url: "https://leetcode.com/problems/find-the-duplicate-number/" },
          { title: "H-Index", id: 274, url: "https://leetcode.com/problems/h-index/" },
          { title: "H-Index II", id: 275, url: "https://leetcode.com/problems/h-index-ii/" },
          { title: "Count of Smaller Numbers After Self", id: 315, url: "https://leetcode.com/problems/count-of-smaller-numbers-after-self/" },
          { title: "Longest Increasing Subsequence", id: 300, url: "https://leetcode.com/problems/longest-increasing-subsequence/" },
          { title: "Russian Doll Envelopes", id: 354, url: "https://leetcode.com/problems/russian-doll-envelopes/" },
          { title: "Max Sum of Rectangle No Larger Than K", id: 363, url: "https://leetcode.com/problems/max-sum-of-rectangle-no-larger-than-k/" },
          { title: "Find Right Interval", id: 436, url: "https://leetcode.com/problems/find-right-interval/" },
          { title: "Random Pick with Weight", id: 528, url: "https://leetcode.com/problems/random-pick-with-weight/" },
          { title: "Kth Smallest Element in a Sorted Matrix", id: 378, url: "https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/" },
          { title: "Find K-th Smallest Pair Distance", id: 719, url: "https://leetcode.com/problems/find-k-th-smallest-pair-distance/" },
          { title: "Count of Range Sum", id: 327, url: "https://leetcode.com/problems/count-of-range-sum/" },
          { title: "Minimum Limit of Balls in a Bag", id: 1760, url: "https://leetcode.com/problems/minimum-limit-of-balls-in-a-bag/" },
          { title: "Magnetic Force Between Two Balls", id: 1552, url: "https://leetcode.com/problems/magnetic-force-between-two-balls/" },
          { title: "Maximum Number of Removable Characters", id: 1898, url: "https://leetcode.com/problems/maximum-number-of-removable-characters/" },
          { title: "Minimum Number of Days to Make m Bouquets", id: 1482, url: "https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/" },
          { title: "Cutting Ribbons", id: 1891, url: "https://leetcode.com/problems/cutting-ribbons/" },
          { title: "Maximum Value at a Given Index", id: 1802, url: "https://leetcode.com/problems/maximum-value-at-a-given-index-in-a-bounded-array/" },
          { title: "Maximum Candies Allocated to K Children", id: 2226, url: "https://leetcode.com/problems/maximum-candies-allocated-to-k-children/" },
          { title: "Minimum Time to Complete Trips", id: 2187, url: "https://leetcode.com/problems/minimum-time-to-complete-trips/" },
          { title: "Minimize Maximum of Array", id: 2439, url: "https://leetcode.com/problems/minimize-maximum-of-array/" },
          { title: "Find the Longest Substring Containing Vowels", id: 1371, url: "https://leetcode.com/problems/find-the-longest-substring-containing-vowels-in-even-counts/" },
          { title: "Maximum Number of Events That Can Be Attended II", id: 1751, url: "https://leetcode.com/problems/maximum-number-of-events-that-can-be-attended-ii/" },
          { title: "Maximize Score After N Operations", id: 1799, url: "https://leetcode.com/problems/maximize-score-after-n-operations/" },
        ]
      },
      {
        id: 7,
        name: "Backtracking",
        problems: 50,
        completed: getCount('Backtracking'),
        questions: [
          { title: "Subsets", id: 78, url: "https://leetcode.com/problems/subsets/" },
          { title: "Subsets II", id: 90, url: "https://leetcode.com/problems/subsets-ii/" },
          { title: "Permutations", id: 46, url: "https://leetcode.com/problems/permutations/" },
          { title: "Permutations II", id: 47, url: "https://leetcode.com/problems/permutations-ii/" },
          { title: "Combination Sum", id: 39, url: "https://leetcode.com/problems/combination-sum/" },
          { title: "Combination Sum II", id: 40, url: "https://leetcode.com/problems/combination-sum-ii/" },
          { title: "Combination Sum III", id: 216, url: "https://leetcode.com/problems/combination-sum-iii/" },
          { title: "Combinations", id: 77, url: "https://leetcode.com/problems/combinations/" },
          { title: "Letter Combinations of a Phone Number", id: 17, url: "https://leetcode.com/problems/letter-combinations-of-a-phone-number/" },
          { title: "Generate Parentheses", id: 22, url: "https://leetcode.com/problems/generate-parentheses/" },
          { title: "Word Search", id: 79, url: "https://leetcode.com/problems/word-search/" },
          { title: "Word Search II", id: 212, url: "https://leetcode.com/problems/word-search-ii/" },
          { title: "N-Queens", id: 51, url: "https://leetcode.com/problems/n-queens/" },
          { title: "N-Queens II", id: 52, url: "https://leetcode.com/problems/n-queens-ii/" },
          { title: "Palindrome Partitioning", id: 131, url: "https://leetcode.com/problems/palindrome-partitioning/" },
          { title: "Palindrome Partitioning II", id: 132, url: "https://leetcode.com/problems/palindrome-partitioning-ii/" },
          { title: "Restore IP Addresses", id: 93, url: "https://leetcode.com/problems/restore-ip-addresses/" },
          { title: "Sudoku Solver", id: 37, url: "https://leetcode.com/problems/sudoku-solver/" },
          { title: "Valid Sudoku", id: 36, url: "https://leetcode.com/problems/valid-sudoku/" },
          { title: "Surrounded Regions", id: 130, url: "https://leetcode.com/problems/surrounded-regions/" },
          { title: "Path Sum II", id: 113, url: "https://leetcode.com/problems/path-sum-ii/" },
          { title: "Binary Tree Paths", id: 257, url: "https://leetcode.com/problems/binary-tree-paths/" },
          { title: "Letter Case Permutation", id: 784, url: "https://leetcode.com/problems/letter-case-permutation/" },
          { title: "Increasing Subsequences", id: 491, url: "https://leetcode.com/problems/non-decreasing-subsequences/" },
          { title: "Beautiful Arrangement", id: 526, url: "https://leetcode.com/problems/beautiful-arrangement/" },
          { title: "Matchsticks to Square", id: 473, url: "https://leetcode.com/problems/matchsticks-to-square/" },
          { title: "Partition to K Equal Sum Subsets", id: 698, url: "https://leetcode.com/problems/partition-to-k-equal-sum-subsets/" },
          { title: "Split Array into Fibonacci Sequence", id: 842, url: "https://leetcode.com/problems/split-array-into-fibonacci-like-sequence/" },
          { title: "All Paths From Source to Target", id: 797, url: "https://leetcode.com/problems/all-paths-from-source-to-target/" },
          { title: "Expression Add Operators", id: 282, url: "https://leetcode.com/problems/expression-add-operators/" },
          { title: "Different Ways to Add Parentheses", id: 241, url: "https://leetcode.com/problems/different-ways-to-add-parentheses/" },
          { title: "Remove Invalid Parentheses", id: 301, url: "https://leetcode.com/problems/remove-invalid-parentheses/" },
          { title: "Additive Number", id: 306, url: "https://leetcode.com/problems/additive-number/" },
          { title: "Gray Code", id: 89, url: "https://leetcode.com/problems/gray-code/" },
          { title: "Generalized Abbreviation", id: 320, url: "https://leetcode.com/problems/generalized-abbreviation/" },
          { title: "Iterator for Combination", id: 1286, url: "https://leetcode.com/problems/iterator-for-combination/" },
          { title: "Factor Combinations", id: 254, url: "https://leetcode.com/problems/factor-combinations/" },
          { title: "Strobogrammatic Number II", id: 247, url: "https://leetcode.com/problems/strobogrammatic-number-ii/" },
          { title: "Count Numbers with Unique Digits", id: 357, url: "https://leetcode.com/problems/count-numbers-with-unique-digits/" },
          { title: "Android Unlock Patterns", id: 351, url: "https://leetcode.com/problems/android-unlock-patterns/" },
          { title: "Optimal Account Balancing", id: 465, url: "https://leetcode.com/problems/optimal-account-balancing/" },
          { title: "Shopping Offers", id: 638, url: "https://leetcode.com/problems/shopping-offers/" },
          { title: "Pyramid Transition Matrix", id: 756, url: "https://leetcode.com/problems/pyramid-transition-matrix/" },
          { title: "Longest Increasing Path in Matrix", id: 329, url: "https://leetcode.com/problems/longest-increasing-path-in-a-matrix/" },
          { title: "Cracking the Safe", id: 753, url: "https://leetcode.com/problems/cracking-the-safe/" },
          { title: "Zuma Game", id: 488, url: "https://leetcode.com/problems/zuma-game/" },
          { title: "Minimum Unique Word Abbreviation", id: 411, url: "https://leetcode.com/problems/minimum-unique-word-abbreviation/" },
          { title: "Reconstruct Itinerary", id: 332, url: "https://leetcode.com/problems/reconstruct-itinerary/" },
          { title: "Max Length of a Concatenated String", id: 1239, url: "https://leetcode.com/problems/maximum-length-of-a-concatenated-string-with-unique-characters/" },
          { title: "Number of Squareful Arrays", id: 996, url: "https://leetcode.com/problems/number-of-squareful-arrays/" },
        ]
      },
    ]
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-12 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-40" />
          ))}
        </div>
      </div>
    );
  }

  if (selectedSheet) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => setSelectedSheet(null)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-4xl font-bold gradient-heading mb-2">{selectedSheet.name}</h1>
            <p className="text-muted-foreground">{getCount(selectedSheet.name)} of {selectedSheet.problems} problems completed</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Problems</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead className="text-right">Link</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedSheet.questions?.map((question: any) => (
                  <TableRow key={question.id}>
                    <TableCell className="font-medium">{question.id}</TableCell>
                    <TableCell>{question.title}</TableCell>
                    <TableCell><input type="checkbox" name="solved" checked={solvedQ.some((ele) => ele?.id === question?.id)} onChange={() => addQuestions({ id: question.id, sheet: selectedSheet.name })} /></TableCell>
                    <TableCell className="text-right">
                      <a
                        href={question.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-primary hover:underline"
                      >
                        Solve <ExternalLink className="h-4 w-4" />
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-4xl font-bold gradient-heading mb-2">Coding Sheet</h1>
        <p className="text-muted-foreground">Master coding problems organized by topics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {result?.sheets?.map((sheet: any) => (
          <Card
            key={sheet.id}
            className="shadow-card hover:shadow-card-hover transition-all cursor-pointer"
            onClick={() => setSelectedSheet(sheet)}
          >
            <CardHeader>
              <CardTitle>{sheet.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Problems</span>
                  <span className="font-semibold">{sheet.problems}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Completed</span>
                  <span className="font-semibold text-primary">{sheet.completed}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mt-3">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-secondary via-primary to-accent"
                    style={{ width: `${(sheet.completed / sheet.problems) * 100}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CodingSheet;
