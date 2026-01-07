import React, { useState } from 'react';
import styles from './styles.module.scss';

interface FileTreeNode {
  name: string;
  type: 'file' | 'folder';
  comment?: string;
  children?: FileTreeNode[];
}

interface FileTreeProps {
  data: FileTreeNode[];
  defaultExpanded?: boolean;
}

const FolderIconClosed = () => (
  <svg
    className={styles.icon}
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M3.75 3A1.75 1.75 0 002 4.75v3.26a3.235 3.235 0 011.75-.51h12.5c.644 0 1.245.188 1.75.51V6.75A1.75 1.75 0 0016.25 5h-4.836a.25.25 0 01-.177-.073L9.823 3.513A1.75 1.75 0 008.586 3H3.75zM3.75 9A1.75 1.75 0 002 10.75v4.5c0 .966.784 1.75 1.75 1.75h12.5A1.75 1.75 0 0018 15.25v-4.5A1.75 1.75 0 0016.25 9H3.75z" />
  </svg>
);

const FolderIconOpen = () => (
  <svg
    className={styles.icon}
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M2 4.75A1.75 1.75 0 013.75 3h4.836c.464 0 .909.184 1.237.513l1.414 1.414a.25.25 0 00.177.073h4.836A1.75 1.75 0 0118 6.75v8.5A1.75 1.75 0 0116.25 17H3.75A1.75 1.75 0 012 15.25V4.75z" />
  </svg>
);

const FileIcon = () => (
  <svg
    className={styles.icon}
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M4.5 2A1.5 1.5 0 003 3.5v13A1.5 1.5 0 004.5 18h11a1.5 1.5 0 001.5-1.5V7.621a1.5 1.5 0 00-.44-1.06l-4.12-4.122A1.5 1.5 0 0011.378 2H4.5zm2.25 8.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5zm0 3a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z" />
  </svg>
);

const ChevronIcon = ({ expanded }: { expanded: boolean }) => (
  <svg
    className={`${styles.chevron} ${expanded ? styles.chevronExpanded : ''}`}
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
  </svg>
);

interface TreeNodeProps {
  node: FileTreeNode;
  level: number;
  defaultExpanded: boolean;
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, level, defaultExpanded }) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const hasChildren = node.children && node.children.length > 0;
  const isFolder = node.type === 'folder';

  const handleToggle = () => {
    if (isFolder && hasChildren) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div className={styles.nodeWrapper}>
      <div
        className={`${styles.node} ${isFolder && hasChildren ? styles.nodeClickable : ''}`}
        style={{ paddingLeft: `${level * 20}px` }}
      >
        {isFolder && hasChildren ? (
          <button
            className={styles.toggleButton}
            onClick={handleToggle}
            aria-expanded={isExpanded}
            aria-label={isExpanded ? 'Collapse folder' : 'Expand folder'}
          >
            <ChevronIcon expanded={isExpanded} />
            {isExpanded ? <FolderIconOpen /> : <FolderIconClosed />}
          </button>
        ) : (
          <span className={styles.iconWrapper}>
            {isFolder ? <FolderIconClosed /> : <FileIcon />}
          </span>
        )}
        <span className={styles.name}>{node.name}</span>
        {node.comment && <span className={styles.comment}>{node.comment}</span>}
      </div>
      {hasChildren && isExpanded && (
        <div className={styles.children}>
          {node.children!.map((child, index) => (
            <TreeNode
              key={`${child.name}-${index}`}
              node={child}
              level={level + 1}
              defaultExpanded={defaultExpanded}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const FileTree: React.FC<FileTreeProps> = ({ data, defaultExpanded = true }) => {
  return (
    <div className={styles.fileTree}>
      {data.map((node, index) => (
        <TreeNode
          key={`${node.name}-${index}`}
          node={node}
          level={0}
          defaultExpanded={defaultExpanded}
        />
      ))}
    </div>
  );
};

export default FileTree;
export { FileTree, FileTreeNode };
