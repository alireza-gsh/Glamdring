import { Card, CardContent, Grid, Skeleton } from '@mui/material';
import { Box } from '@mui/system';
import useAction from 'hooks/useAction';
import useToasts from 'hooks/useToasts';
import { useEffect, useState } from 'react';
import ActionManageFormDialog from './ActionManageFormDialog';

/**
 * A component with a list of actions.
 */
export default function ActionList() {
  const { showToastError } = useToasts();
  const { getActions } = useAction();
  const [actions, setActions] = useState(null);

  async function loadActions() {
    try {
      setActions(await getActions());
    } catch (error) {
      showToastError(error);
    }
  }

  useEffect(() => {
    loadActions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      {actions ? (
        <Grid container spacing={3}>
          {actions.map((action, index) => (
            <Grid key={index} item xs={12}>
              <Card elevation={3} sx={{ p: 1 }}>
                <CardContent>
                  <Box sx={{ overflowX: 'scroll', mb: 2 }}>
                    <pre style={{ maxWidth: '240px' }}>
                      {JSON.stringify(action, null, 2)}
                    </pre>
                  </Box>
                  <ActionManageFormDialog action={action} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <>
          <Skeleton
            variant="rectangular"
            sx={{ mb: 1 }}
            width={196}
            height={24}
          />
          <Skeleton variant="rectangular" width={82} height={24} />
        </>
      )}
    </Box>
  );
}
