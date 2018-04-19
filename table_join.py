Author: James Uejio

class BinTree:
    empty = ()

    def __init__(self, label, left=empty, right=empty):
        self.label = label
        self.left = left
        self.right = right


def insert(bst, n):
    if bst == BinTree.empty:
        return BinTree(n)
    elif bst.label >= n:
        return BinTree(bst.label, insert(bst.left, n), bst.right)
    else:
        return BinTree(bst.label, bst.left, insert(bst.right, n))


def contains(bst, elem):
    if not bst:
        return False
    if bst.label == elem:
        return True
    if bst.label > elem:
        return contains(bst.left, elem)
    return contains(bst.right, elem)


table1 = [1, 2, 3]
table2 = [-1, 0, 3]
# Assuming no duplicates


def naive_join(table1, table2):
    table3 = []
    for x in table1:
        for y in table2:
            if x == y:
                table3.append(x)
    return table3

# What is the runtime in terms of N, the length of T1 and T2?


def bst_join(table1, table2):
    table3 = []

    # Create BST from table2
    bst = BinTree.empty
    for y in table2:
        bst = insert(bst, y)
    # Assume runtime for creating BST is n log n

    for x in table1:
        if contains(bst, x):
            table3.append(x)
    return table3

# What is the runtime?


def set_join(table1, table2):
    table3 = []

    # Create set from table2
    t2_set = set()
    for y in table2:
        t2_set.add(y)

    for x in table1:
        if x in t2_set:
            table3.append(x)
    return table3


# What is the runtime?
