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
  List,
  ListItem,
  Badge,
  Flex,
  FlexItem
} from '@patternfly/react-core';

export const Overview: React.FunctionComponent = () => {
  return (
    <PageSection>
      <TextContent>
        <Title headingLevel="h1" size="2xl">
          Image Builder Comparison Portfolio
        </Title>
        <Text>
          This portfolio showcases a detailed comparison between two image builder implementations:
          the production-ready <strong>image-builder-frontend</strong> and the prototype <strong>image-builder-UX</strong>.
          Both projects use PatternFly design system but with different architectural approaches.
        </Text>
      </TextContent>

      <Grid hasGutter style={{ marginTop: '2rem' }}>
        <GridItem span={6}>
          <Card isFullHeight>
            <CardTitle>
              <Flex alignItems={{ default: 'alignItemsCenter' }}>
                <FlexItem>image-builder-frontend</FlexItem>
                <FlexItem>
                  <Badge isRead>Production</Badge>
                </FlexItem>
              </Flex>
            </CardTitle>
            <CardBody>
              <TextContent>
                <Text>
                  Enterprise-grade implementation with comprehensive features and robust architecture.
                </Text>
                <List>
                  <ListItem>PatternFly 4.x components</ListItem>
                  <ListItem>Redux + RTK Query state management</ListItem>
                  <ListItem>Multi-step wizard workflows</ListItem>
                  <ListItem>Comprehensive validation system</ListItem>
                  <ListItem>Enterprise data tables</ListItem>
                  <ListItem>Cloud integration (AWS, Azure, GCP)</ListItem>
                </List>
              </TextContent>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem span={6}>
          <Card isFullHeight>
            <CardTitle>
              <Flex alignItems={{ default: 'alignItemsCenter' }}>
                <FlexItem>image-builder-UX</FlexItem>
                <FlexItem>
                  <Badge>Prototype</Badge>
                </FlexItem>
              </Flex>
            </CardTitle>
            <CardBody>
              <TextContent>
                <Text>
                  Streamlined prototype focusing on core user workflows and simplified implementation.
                </Text>
                <List>
                  <ListItem>PatternFly 4.x components</ListItem>
                  <ListItem>React useState hooks</ListItem>
                  <ListItem>Modal-based workflows</ListItem>
                  <ListItem>Basic form validation</ListItem>
                  <ListItem>Custom HTML tables</ListItem>
                  <ListItem>Demo-friendly sample data</ListItem>
                </List>
              </TextContent>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem span={12}>
          <Card>
            <CardTitle>Portfolio Structure</CardTitle>
            <CardBody>
              <Grid hasGutter>
                <GridItem span={4}>
                  <Card isCompact>
                    <CardTitle>Wizard vs Modal</CardTitle>
                    <CardBody>
                      Compare multi-step wizard implementation vs modal-based workflows
                    </CardBody>
                  </Card>
                </GridItem>
                <GridItem span={4}>
                  <Card isCompact>
                    <CardTitle>State Management</CardTitle>
                    <CardBody>
                      Redux/RTK Query patterns vs React useState hooks
                    </CardBody>
                  </Card>
                </GridItem>
                <GridItem span={4}>
                  <Card isCompact>
                    <CardTitle>Form Validation</CardTitle>
                    <CardBody>
                      Comprehensive validation system vs basic form validation
                    </CardBody>
                  </Card>
                </GridItem>
                <GridItem span={4}>
                  <Card isCompact>
                    <CardTitle>Status & Progress</CardTitle>
                    <CardBody>
                      Enterprise status handling vs simplified indicators
                    </CardBody>
                  </Card>
                </GridItem>
                <GridItem span={4}>
                  <Card isCompact>
                    <CardTitle>Data Tables</CardTitle>
                    <CardBody>
                      PatternFly tables with sorting/filtering vs custom implementations
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