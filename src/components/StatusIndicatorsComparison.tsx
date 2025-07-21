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
  Badge,
  Label,
  Spinner,
  Tooltip,
  Popover,
  Button
} from '@patternfly/react-core';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InProgressIcon,
  ClockIcon
} from '@patternfly/react-icons';

export const StatusIndicatorsComparison: React.FunctionComponent = () => {
  const [activeTabKey, setActiveTabKey] = React.useState<string | number>(0);

  const handleTabClick = (
    _event: React.MouseEvent<any> | React.KeyboardEvent | MouseEvent,
    tabIndex: string | number
  ) => {
    setActiveTabKey(tabIndex);
  };

  const enterpriseStatusCode = `// image-builder-frontend: Status.tsx
import { Popover, Label, Spinner } from '@patternfly/react-core';

interface StatusProps {
  imageStatus: {
    status: 'pending' | 'building' | 'uploading' | 'success' | 'failure';
    uploadStatus?: {
      type: 'aws' | 'azure' | 'gcp';
      url?: string;
      expiration?: Date;
    };
    error?: {
      id: string;
      reason: string;
      details: any;
    };
  };
  composeId: string;
}

export const Status: React.FC<StatusProps> = ({ imageStatus, composeId }) => {
  const [showErrorDetails, setShowErrorDetails] = useState(false);
  
  const getStatusDisplay = () => {
    switch (imageStatus.status) {
      case 'pending':
        return (
          <Label icon={<ClockIcon />} color="blue">
            Image build pending
          </Label>
        );
      case 'building':
        return (
          <Label icon={<Spinner size="sm" />} color="blue">
            Image build in progress
          </Label>
        );
      case 'uploading':
        return (
          <Label icon={<Spinner size="sm" />} color="blue">
            Uploading image
          </Label>
        );
      case 'success':
        return (
          <Popover
            headerContent="Image ready for download"
            bodyContent={renderSuccessDetails()}
          >
            <Label 
              icon={<CheckCircleIcon />} 
              color="green"
              isCompact
              style={{ cursor: 'pointer' }}
            >
              Ready
            </Label>
          </Popover>
        );
      case 'failure':
        return (
          <Popover
            headerContent="Image build failed"
            bodyContent={
              <div>
                <Text>Error ID: {imageStatus.error?.id}</Text>
                <Text>Reason: {imageStatus.error?.reason}</Text>
                <Button 
                  variant="link"
                  onClick={() => copyErrorDetails()}
                  isInline
                >
                  Copy error details
                </Button>
              </div>
            }
          >
            <Label 
              icon={<ExclamationCircleIcon />} 
              color="red"
              style={{ cursor: 'pointer' }}
            >
              Build failed
            </Label>
          </Popover>
        );
    }
  };

  const renderSuccessDetails = () => {
    const { uploadStatus } = imageStatus;
    if (!uploadStatus) return null;

    const isExpired = uploadStatus.expiration && new Date() > uploadStatus.expiration;
    
    return (
      <div>
        <Text>Available for download from {uploadStatus.type.toUpperCase()}</Text>
        {uploadStatus.expiration && (
          <Text component="small">
            {isExpired ? 
              <span style={{ color: 'var(--pf-global--danger-color--100)' }}>
                Expired {formatDate(uploadStatus.expiration)}
              </span> :
              \`Expires \${formatDate(uploadStatus.expiration)}\`
            }
          </Text>
        )}
        {uploadStatus.url && (
          <Button 
            variant="primary" 
            component="a" 
            href={uploadStatus.url}
            target="_blank"
          >
            Download
          </Button>
        )}
      </div>
    );
  };

  return getStatusDisplay();
};`;

  const basicStatusCode = `// image-builder-UX: Dashboard.tsx
const StatusBadge = ({ status, details }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'ready':
        return {
          color: 'green',
          icon: '✓',
          text: 'Ready',
          tooltip: 'Image is ready for download'
        };
      case 'expired':
        return {
          color: 'orange', 
          icon: '⚠',
          text: 'Expired',
          tooltip: 'Image has expired and is no longer available'
        };
      case 'build failed':
        return {
          color: 'red',
          icon: '✗', 
          text: 'Build failed',
          tooltip: 'Image build failed. Check logs for details.'
        };
      default:
        return {
          color: 'blue',
          icon: '○',
          text: 'Unknown',
          tooltip: 'Status unknown'
        };
    }
  };

  const config = getStatusConfig(status);
  
  return (
    <Tooltip content={config.tooltip}>
      <Badge 
        color={config.color}
        style={{ cursor: 'pointer' }}
      >
        {config.icon} {config.text}
      </Badge>
    </Tooltip>
  );
};

// Usage in table
const ImageRow = ({ image }) => {
  return (
    <tr>
      <td>{image.name}</td>
      <td>{image.distribution}</td>
      <td>
        <StatusBadge 
          status={image.status} 
          details={image.statusDetails}
        />
      </td>
      <td>{image.created}</td>
    </tr>
  );
};`;

  return (
    <PageSection>
      <TextContent>
        <Title headingLevel="h1" size="2xl">
          Status & Progress Indicators
        </Title>
        <Text>
          Comparing comprehensive status handling with detailed error information vs simplified status badges.
        </Text>
      </TextContent>

      <Grid hasGutter style={{ marginTop: '2rem' }}>
        <GridItem span={12}>
          <Card>
            <CardTitle>Live Status Examples</CardTitle>
            <CardBody>
              <Grid hasGutter>
                <GridItem span={3}>
                  <Text component="h4">Enterprise Status (Frontend)</Text>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <Label icon={<ClockIcon />} color="blue">Image build pending</Label>
                    <Label icon={<Spinner size="sm" />} color="blue">Building...</Label>
                    <Popover
                      headerContent="Image ready"
                      bodyContent={
                        <div>
                          <Text>Available for download from AWS</Text>
                          <Text component="small">Expires in 7 days</Text>
                          <Button variant="primary" size="sm">Download</Button>
                        </div>
                      }
                    >
                      <Label 
                        icon={<CheckCircleIcon />} 
                        color="green"
                        style={{ cursor: 'pointer' }}
                      >
                        Ready
                      </Label>
                    </Popover>
                    <Popover
                      headerContent="Build failed"
                      bodyContent={
                        <div>
                          <Text>Error ID: IMG-001</Text>
                          <Text>Reason: Package conflict</Text>
                          <Button variant="link" isInline>Copy details</Button>
                        </div>
                      }
                    >
                      <Label 
                        icon={<ExclamationCircleIcon />} 
                        color="red"
                        style={{ cursor: 'pointer' }}
                      >
                        Build failed
                      </Label>
                    </Popover>
                  </div>
                </GridItem>
                
                <GridItem span={3}>
                  <Text component="h4">Simple Status (UX)</Text>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <Tooltip content="Image is ready for download">
                      <Badge color="green">✓ Ready</Badge>
                    </Tooltip>
                    <Tooltip content="Image has expired">
                      <Badge color="orange">⚠ Expired</Badge>
                    </Tooltip>
                    <Tooltip content="Build failed - check logs">
                      <Badge color="red">✗ Build failed</Badge>
                    </Tooltip>
                  </div>
                </GridItem>
                
                <GridItem span={6}>
                  <Card isCompact>
                    <CardTitle>Feature Comparison</CardTitle>
                    <CardBody>
                      <Grid hasGutter>
                        <GridItem span={6}>
                          <Text component="h5">Frontend (Enterprise)</Text>
                          <Text component="small">
                            ✅ Detailed error information<br/>
                            ✅ Cloud-specific status handling<br/>
                            ✅ Expiration tracking<br/>
                            ✅ Download links<br/>
                            ✅ Copy error details<br/>
                            ✅ Interactive popovers
                          </Text>
                        </GridItem>
                        <GridItem span={6}>
                          <Text component="h5">UX (Simple)</Text>
                          <Text component="small">
                            ✅ Clear visual indicators<br/>
                            ✅ Tooltip explanations<br/>
                            ✅ Color-coded status<br/>
                            ❌ Limited error details<br/>
                            ❌ No expiration tracking<br/>
                            ❌ Basic interaction
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

        <GridItem span={12}>
          <Card>
            <CardTitle>Implementation Comparison</CardTitle>
            <CardBody>
              <Tabs activeKey={activeTabKey} onSelect={handleTabClick}>
                <Tab eventKey={0} title={<TabTitleText>Enterprise Status System</TabTitleText>}>
                  <CodeBlock>
                    <CodeBlockCode>{enterpriseStatusCode}</CodeBlockCode>
                  </CodeBlock>
                </Tab>
                <Tab eventKey={1} title={<TabTitleText>Simple Status Badges</TabTitleText>}>
                  <CodeBlock>
                    <CodeBlockCode>{basicStatusCode}</CodeBlockCode>
                  </CodeBlock>
                </Tab>
              </Tabs>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem span={12}>
          <Card>
            <CardTitle>Status Architecture Analysis</CardTitle>
            <CardBody>
              <Grid hasGutter>
                <GridItem span={4}>
                  <Card isCompact>
                    <CardTitle>Information Density</CardTitle>
                    <CardBody>
                      <Text component="small">
                        <strong>Frontend:</strong> Rich contextual information with error IDs, expiration dates, download links<br/>
                        <strong>UX:</strong> Essential status information with clear visual hierarchy
                      </Text>
                    </CardBody>
                  </Card>
                </GridItem>
                <GridItem span={4}>
                  <Card isCompact>
                    <CardTitle>User Interaction</CardTitle>
                    <CardBody>
                      <Text component="small">
                        <strong>Frontend:</strong> Interactive popovers, copy functionality, direct download links<br/>
                        <strong>UX:</strong> Hover tooltips with explanatory text
                      </Text>
                    </CardBody>
                  </Card>
                </GridItem>
                <GridItem span={4}>
                  <Card isCompact>
                    <CardTitle>Error Handling</CardTitle>
                    <CardBody>
                      <Text component="small">
                        <strong>Frontend:</strong> Detailed error tracking with structured error objects<br/>
                        <strong>UX:</strong> Basic error states with generic messaging
                      </Text>
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