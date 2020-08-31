class Node:
    
    def __init__(self,val):
        self.Next = None
        self.data = val

class List:
    
    def __init__(self,val=0):
        self.Head = Node(val)
        self.last = self.Head
        
    def Print():
        print(self.Head.data)
        
    def addEnd(val):
        temp = Node(val)
        self.last.Next = temp
        Head.last = Node(val)
    
