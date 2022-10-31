import { Tree } from 'primereact/tree';
import TreeNode from 'primereact/treenode';
import { useEffect, useState } from 'react';
import { NodeService } from '../service/NodeService';

function FileTree() {
    const [nodes, setNodes] = useState([]);
    const [selectedKey, setSelectedKey] = useState(null);
    const [expandedKeys, setExpandedKeys] = useState({});

    useEffect(() => {
        const nodeService = new NodeService();
        nodeService.getTreeNodes().then((data: any) => setNodes(data));
    }, []);

    return (
        <div className="flex-row w-full h-full ml-3">
            <h2 className="text-left ml-1">Browser</h2>
            <Tree
                value={nodes as TreeNode[]}
                className="border-0 p-0"
                expandedKeys={expandedKeys}
                selectionKeys={selectedKey}
                selectionMode="single"
                onSelectionChange={e => setSelectedKey(e.value)}
                onSelect={() => {}}
                onUnselect={() => {}}
            />
        </div>
    );
}

export default FileTree;
