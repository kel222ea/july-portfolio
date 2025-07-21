import * as React from 'react';
import {
  PageSection,
  Title,
  Card,
  CardBody,
  CardTitle,
  Grid,
  GridItem,
  Text,
  TextContent,
  CodeBlock,
  CodeBlockCode,
  Tabs,
  Tab,
  TabTitleText,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Pagination,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
  TextInput,
  Select,
  SelectOption,
  Button,
  Checkbox
} from '@patternfly/react-core';

export const DataTablesComparison: React.FunctionComponent = () => {
  const [activeTabKey, setActiveTabKey] = React.useState<string | number>(0);
  const [page, setPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(10);
  const [searchValue, setSearchValue] = React.useState('');

  const handleTabClick = (
    _event: React.MouseEvent<any> | React.KeyboardEvent | MouseEvent,
    tabIndex: string | number
  ) => {
    setActiveTabKey(tabIndex);
  };

  const sampleData = [
    { id: 1, name: 'rhel-8-base', distribution: 'RHEL 8.9', architecture: 'x86_64', status: 'Ready', created: '2024-01-15' },
    { id: 2, name: 'ubuntu-22-dev', distribution: 'Ubuntu 22.04', architecture: 'x86_64', status: 'Building', created: '2024-01-14' },
    { id: 3, name: 'centos-stream-minimal', distribution: 'CentOS Stream 9', architecture: 'aarch64', status: 'Failed', created: '2024-01-13' }
  ];

  const enterpriseTableCode = `// image-builder-frontend: ImagesTable.tsx
import { 
  Table, Thead, Tr, Th, Tbody, Td, 
  ActionsColumn, ExpandableRowContent,
  Pagination, Toolbar, ToolbarContent, ToolbarItem
} from '@patternfly/react-core';

interface ImagesTableProps {
  images: ImageBuildRequest[];
  onDeleteImage: (id: string) => void;
  onRecreateImage: (id: string) => void;
  onCloneImage: (id: string) => void;
}

export const ImagesTable: React.FC<ImagesTableProps> = ({
  images,
  onDeleteImage,
  onRecreateImage,
  onCloneImage
}) => {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<ISortBy>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [filters, setFilters] = useState({
    name: '',
    status: '',
    distribution: ''
  });

  // Sorting logic
  const sortedImages = useMemo(() => {
    if (!sortBy.index) return images;
    
    const sortedData = [...images].sort((a, b) => {
      const aValue = getCellValue(a, sortBy.index);
      const bValue = getCellValue(b, sortBy.index);
      
      if (sortBy.direction === SortByDirection.asc) {
        return aValue.localeCompare(bValue);
      }
      return bValue.localeCompare(aValue);
    });
    
    return sortedData;
  }, [images, sortBy]);

  // Filtering logic
  const filteredImages = useMemo(() => {
    return sortedImages.filter(image => {
      return (
        image.name.toLowerCase().includes(filters.name.toLowerCase()) &&
        (filters.status === '' || image.status === filters.status) &&
        (filters.distribution === '' || image.distribution.includes(filters.distribution))
      );
    });
  }, [sortedImages, filters]);

  // Pagination logic
  const paginatedImages = useMemo(() => {
    const startIdx = (currentPage - 1) * perPage;
    return filteredImages.slice(startIdx, startIdx + perPage);
  }, [filteredImages, currentPage, perPage]);

  const columnNames = {
    name: 'Name',
    distribution: 'Distribution', 
    architecture: 'Architecture',
    imageType: 'Image type',
    target: 'Target',
    status: 'Status',
    created: 'Created'
  };

  const renderExpandedContent = (image: ImageBuildRequest) => (
    <ExpandableRowContent>
      <Grid hasGutter>
        <GridItem span={6}>
          <DescriptionList>
            <DescriptionListGroup>
              <DescriptionListTerm>Compose ID</DescriptionListTerm>
              <DescriptionListDescription>{image.composeId}</DescriptionListDescription>
            </DescriptionListGroup>
            <DescriptionListGroup>
              <DescriptionListTerm>Packages</DescriptionListTerm>
              <DescriptionListDescription>
                {image.customizations?.packages?.map(pkg => pkg.name).join(', ') || 'None'}
              </DescriptionListDescription>
            </DescriptionListGroup>
          </DescriptionList>
        </GridItem>
        <GridItem span={6}>
          <DescriptionList>
            <DescriptionListGroup>
              <DescriptionListTerm>Upload target</DescriptionListTerm>
              <DescriptionListDescription>
                {image.uploadTarget?.type || 'Guest image'}
              </DescriptionListDescription>
            </DescriptionListGroup>
          </DescriptionList>
        </GridItem>
      </Grid>
    </ExpandableRowContent>
  );

  return (
    <>
      <Toolbar>
        <ToolbarContent>
          <ToolbarItem>
            <TextInput
              placeholder="Filter by name"
              value={filters.name}
              onChange={value => setFilters(prev => ({ ...prev, name: value }))}
            />
          </ToolbarItem>
          <ToolbarItem>
            <Select
              placeholder="Filter by status"
              selections={filters.status}
              onSelect={(event, value) => setFilters(prev => ({ ...prev, status: value as string }))}
            >
              <SelectOption value="">All statuses</SelectOption>
              <SelectOption value="success">Success</SelectOption>
              <SelectOption value="failure">Failed</SelectOption>
              <SelectOption value="pending">Pending</SelectOption>
            </Select>
          </ToolbarItem>
        </ToolbarContent>
      </Toolbar>

      <Table
        variant="compact"
        sortBy={sortBy}
        onSort={(event, index, direction) => setSortBy({ index, direction })}
      >
        <Thead>
          <Tr>
            <Th />
            <Th />
            {Object.entries(columnNames).map(([key, name]) => (
              <Th key={key} sort={getSortParams(key)}>
                {name}
              </Th>
            ))}
            <Th />
          </Tr>
        </Thead>
        <Tbody>
          {paginatedImages.map((image, rowIndex) => (
            <React.Fragment key={image.id}>
              <Tr>
                <Td
                  expand={{
                    rowIndex,
                    isExpanded: expandedRows.has(image.id),
                    onToggle: () => toggleExpanded(image.id)
                  }}
                />
                <Td
                  select={{
                    rowIndex,
                    onSelect: () => toggleSelected(image.id),
                    isSelected: selectedRows.has(image.id)
                  }}
                />
                <Td>{image.name}</Td>
                <Td>{image.distribution}</Td>
                <Td>{image.architecture}</Td>
                <Td>{image.imageType}</Td>
                <Td>{image.uploadTarget?.type || 'Guest image'}</Td>
                <Td>
                  <Status 
                    status={image.status} 
                    uploadStatus={image.uploadStatus}
                    error={image.error}
                  />
                </Td>
                <Td>{formatDate(image.createdAt)}</Td>
                <Td isActionCell>
                  <ActionsColumn
                    items={[
                      {
                        title: 'Recreate',
                        onClick: () => onRecreateImage(image.id)
                      },
                      {
                        title: 'Clone',
                        onClick: () => onCloneImage(image.id)
                      },
                      {
                        title: 'Delete',
                        onClick: () => onDeleteImage(image.id)
                      }
                    ]}
                  />
                </Td>
              </Tr>
              {expandedRows.has(image.id) && (
                <Tr isExpanded>
                  <Td colSpan={9}>
                    {renderExpandedContent(image)}
                  </Td>
                </Tr>
              )}
            </React.Fragment>
          ))}
        </Tbody>
      </Table>

      <Pagination
        itemCount={filteredImages.length}
        page={currentPage}
        perPage={perPage}
        onSetPage={(event, page) => setCurrentPage(page)}
        onPerPageSelect={(event, perPage) => setPerPage(perPage)}
        widgetId="images-table-pagination"
        isCompact
      />
    </>
  );
};`;

  const customTableCode = `// image-builder-UX: Dashboard.tsx (Custom Table)
const ImageTable = ({ images, onImageSelect }) => {
  const [sortField, setSortField] = useState('created');
  const [sortDirection, setSortDirection] = useState('desc');
  const [filterText, setFilterText] = useState('');
  const [selectedImages, setSelectedImages] = useState(new Set());

  // Simple sorting function
  const sortedImages = useMemo(() => {
    const filtered = images.filter(image =>
      image.name.toLowerCase().includes(filterText.toLowerCase()) ||
      image.distribution.toLowerCase().includes(filterText.toLowerCase())
    );

    return filtered.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      
      if (sortDirection === 'asc') {
        return aVal > bVal ? 1 : -1;
      }
      return aVal < bVal ? 1 : -1;
    });
  }, [images, sortField, sortDirection, filterText]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSelectImage = (imageId) => {
    const newSelected = new Set(selectedImages);
    if (newSelected.has(imageId)) {
      newSelected.delete(imageId);
    } else {
      newSelected.add(imageId);
    }
    setSelectedImages(newSelected);
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return '↕';
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  return (
    <div className="image-table-container">
      {/* Simple filter */}
      <div className="table-controls">
        <TextInput
          placeholder="Filter images..."
          value={filterText}
          onChange={setFilterText}
          style={{ maxWidth: '300px', marginBottom: '1rem' }}
        />
      </div>

      {/* Custom HTML table */}
      <table className="pf-c-table pf-m-compact">
        <thead>
          <tr>
            <th>
              <Checkbox 
                id="select-all"
                isChecked={selectedImages.size === sortedImages.length}
                onChange={handleSelectAll}
              />
            </th>
            <th 
              onClick={() => handleSort('name')}
              style={{ cursor: 'pointer' }}
            >
              Name {getSortIcon('name')}
            </th>
            <th 
              onClick={() => handleSort('distribution')}
              style={{ cursor: 'pointer' }}
            >
              Distribution {getSortIcon('distribution')}
            </th>
            <th 
              onClick={() => handleSort('architecture')}
              style={{ cursor: 'pointer' }}
            >
              Architecture {getSortIcon('architecture')}
            </th>
            <th>Status</th>
            <th 
              onClick={() => handleSort('created')}
              style={{ cursor: 'pointer' }}
            >
              Created {getSortIcon('created')}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedImages.map((image) => (
            <ImageRow 
              key={image.id}
              image={image}
              isSelected={selectedImages.has(image.id)}
              onSelect={handleSelectImage}
              onImageSelect={onImageSelect}
            />
          ))}
        </tbody>
      </table>

      {/* Simple pagination info */}
      <div style={{ marginTop: '1rem', textAlign: 'center' }}>
        Showing {sortedImages.length} images
      </div>
    </div>
  );
};

const ImageRow = ({ image, isSelected, onSelect, onImageSelect }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <tr onClick={() => setIsExpanded(!isExpanded)}>
        <td onClick={e => e.stopPropagation()}>
          <Checkbox
            id={\`select-\${image.id}\`}
            isChecked={isSelected}
            onChange={() => onSelect(image.id)}
          />
        </td>
        <td>{image.name}</td>
        <td>{image.distribution}</td>
        <td>{image.architecture}</td>
        <td>
          <StatusBadge status={image.status} details={image.statusDetails} />
        </td>
        <td>{image.created}</td>
        <td onClick={e => e.stopPropagation()}>
          <Button variant="secondary" size="sm" onClick={() => onImageSelect(image)}>
            Details
          </Button>
        </td>
      </tr>
      {isExpanded && (
        <tr className="expanded-row">
          <td colSpan={7}>
            <div style={{ padding: '1rem', backgroundColor: 'var(--pf-global--BackgroundColor--200)' }}>
              <Grid hasGutter>
                <GridItem span={6}>
                  <Text><strong>Image ID:</strong> {image.id}</Text>
                  <Text><strong>Compose ID:</strong> {image.composeId}</Text>
                </GridItem>
                <GridItem span={6}>
                  <Text><strong>Size:</strong> {image.size}</Text>
                  <Text><strong>Packages:</strong> {image.packages?.length || 0} custom packages</Text>
                </GridItem>
              </Grid>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};`;

  return (
    <PageSection>
      <TextContent>
        <Title headingLevel="h1" size="2xl">
          Data Tables Comparison
        </Title>
        <Text>
          Comparing enterprise-grade PatternFly tables with custom HTML table implementations.
        </Text>
      </TextContent>

      <Grid hasGutter style={{ marginTop: '2rem' }}>
        <GridItem span={12}>
          <Card>
            <CardTitle>Live Table Example (PatternFly Style)</CardTitle>
            <CardBody>
              <Toolbar>
                <ToolbarContent>
                  <ToolbarItem>
                    <TextInput
                      placeholder="Filter by name"
                      value={searchValue}
                      onChange={(_event, value) => setSearchValue(value)}
                    />
                  </ToolbarItem>
                </ToolbarContent>
              </Toolbar>
              
              <Table variant="compact">
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Distribution</Th>
                    <Th>Architecture</Th>
                    <Th>Status</Th>
                    <Th>Created</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {sampleData
                    .filter(item => 
                      item.name.toLowerCase().includes(searchValue.toLowerCase())
                    )
                    .map(item => (
                    <Tr key={item.id}>
                      <Td>{item.name}</Td>
                      <Td>{item.distribution}</Td>
                      <Td>{item.architecture}</Td>
                      <Td>
                        <Text 
                          color={
                            item.status === 'Ready' ? 'green' : 
                            item.status === 'Building' ? 'blue' : 'red'
                          }
                        >
                          {item.status}
                        </Text>
                      </Td>
                      <Td>{item.created}</Td>
                      <Td>
                        <Button variant="secondary" size="sm">Details</Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>

              <Pagination
                itemCount={sampleData.length}
                page={page}
                perPage={perPage}
                onSetPage={(_event, page) => setPage(page)}
                onPerPageSelect={(_event, perPage) => setPerPage(perPage)}
                isCompact
              />
            </CardBody>
          </Card>
        </GridItem>

        <GridItem span={12}>
          <Card>
            <CardTitle>Implementation Code Comparison</CardTitle>
            <CardBody>
              <Tabs activeKey={activeTabKey} onSelect={handleTabClick}>
                <Tab eventKey={0} title={<TabTitleText>Enterprise: PatternFly Table</TabTitleText>}>
                  <CodeBlock>
                    <CodeBlockCode>{enterpriseTableCode}</CodeBlockCode>
                  </CodeBlock>
                </Tab>
                <Tab eventKey={1} title={<TabTitleText>Custom: HTML Table</TabTitleText>}>
                  <CodeBlock>
                    <CodeBlockCode>{customTableCode}</CodeBlockCode>
                  </CodeBlock>
                </Tab>
              </Tabs>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem span={12}>
          <Card>
            <CardTitle>Feature Analysis</CardTitle>
            <CardBody>
              <Grid hasGutter>
                <GridItem span={6}>
                  <Card isCompact>
                    <CardTitle>Enterprise Table (Frontend)</CardTitle>
                    <CardBody>
                      <TextContent>
                        <Text component="h5">Advantages:</Text>
                        <Text component="small">
                          ✅ Built-in sorting, filtering, pagination<br/>
                          ✅ Expandable rows with detailed content<br/>
                          ✅ Row selection with bulk operations<br/>
                          ✅ Actions column with dropdown menus<br/>
                          ✅ Consistent PatternFly styling<br/>
                          ✅ Accessibility features built-in<br/>
                          ✅ Responsive design<br/>
                        </Text>
                        <Text component="h5">Challenges:</Text>
                        <Text component="small">
                          ⚠️ Complex configuration<br/>
                          ⚠️ Learning curve for customization<br/>
                          ⚠️ More boilerplate code
                        </Text>
                      </TextContent>
                    </CardBody>
                  </Card>
                </GridItem>
                
                <GridItem span={6}>
                  <Card isCompact>
                    <CardTitle>Custom Table (UX)</CardTitle>
                    <CardBody>
                      <TextContent>
                        <Text component="h5">Advantages:</Text>
                        <Text component="small">
                          ✅ Full control over styling and behavior<br/>
                          ✅ Simple to understand and modify<br/>
                          ✅ Lightweight implementation<br/>
                          ✅ Custom interactions (click to expand)<br/>
                          ✅ Minimal dependencies<br/>
                        </Text>
                        <Text component="h5">Challenges:</Text>
                        <Text component="small">
                          ⚠️ Manual implementation of features<br/>
                          ⚠️ Less consistent with design system<br/>
                          ⚠️ Accessibility needs manual attention<br/>
                          ⚠️ More maintenance overhead
                        </Text>
                      </TextContent>
                    </CardBody>
                  </Card>
                </GridItem>

                <GridItem span={12}>
                  <Card isCompact>
                    <CardTitle>When to Use Each Approach</CardTitle>
                    <CardBody>
                      <Grid hasGutter>
                        <GridItem span={6}>
                          <Text component="h5">Choose PatternFly Table When:</Text>
                          <Text component="small">
                            • Building enterprise applications<br/>
                            • Need consistent design system<br/>
                            • Want built-in accessibility<br/>
                            • Team follows PatternFly patterns<br/>
                            • Complex table requirements<br/>
                            • Long-term maintainability is key
                          </Text>
                        </GridItem>
                        <GridItem span={6}>
                          <Text component="h5">Choose Custom Table When:</Text>
                          <Text component="small">
                            • Building prototypes or demos<br/>
                            • Need unique interactions<br/>
                            • Simple data display requirements<br/>
                            • Want minimal dependencies<br/>
                            • Rapid iteration is needed<br/>
                            • Full control over styling required
                          </Text>
                        </GridItem>
                      </Grid>
                    </CardBody>
                  </Card>
                </GridItem>
              </Grid>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </PageSection>
  );
};