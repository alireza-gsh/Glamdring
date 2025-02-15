import {
  AddOutlined,
  DataObjectOutlined,
  ModeEditOutline,
} from '@mui/icons-material';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import { REPUTATION_RATING } from 'constants/contracts';
import useAction from 'hooks/useAction';
import useDialogContext from 'hooks/useDialogContext';
import useJurisdiction from 'hooks/useJurisdiction';
import useToasts from 'hooks/useToasts';
import { capitalize } from 'lodash';
import { useEffect, useState } from 'react';
import ActionManageDialog from './ActionManageDialog';
import RuleManageDialog from './RuleManageDialog';

/**
 * A component with a table with actions and rules.
 */
export default function ActionRuleTable({ sx }) {
  const { showDialog, closeDialog } = useDialogContext();
  const { showToastError } = useToasts();
  const { getActions } = useAction();
  const { getJusirsdictionRules, isJurisdictionRuleInCategory } =
    useJurisdiction();
  const [isLoading, setIsLoading] = useState(true);
  const [rows, setRows] = useState([]);

  const columns = [
    {
      field: 'actionGuid',
      headerName: 'Action GUID',
      width: 100,
      valueGetter: (params) => `${params.row.action.guid}`,
    },
    {
      field: 'actionSubject',
      headerName: 'Action Subject',
      width: 100,
      valueGetter: (params) => `${params.row.action.action.subject}`,
    },
    {
      field: 'actionVerb',
      headerName: 'Action Verb',
      width: 400,
      valueGetter: (params) => `${params.row.action.action.verb}`,
    },
    {
      field: 'actionObject',
      headerName: 'Action Object',
      width: 100,
      valueGetter: (params) => `${params.row.action.action.object}`,
    },
    {
      field: 'actionTool',
      headerName: 'Action Tool',
      width: 100,
      valueGetter: (params) => `${params.row.action.action.tool}`,
    },
    {
      field: 'actionUriDataName',
      headerName: 'Action URI Data Name',
      width: 300,
      valueGetter: (params) => `${params.row.action.uriData.name}`,
    },
    {
      field: 'actionUriDataDescription',
      headerName: 'Action URI Data Description',
      width: 500,
      valueGetter: (params) => `${params.row.action.uriData.description}`,
    },
    {
      field: 'ruleId',
      headerName: 'Rule ID',
      width: 100,
      valueGetter: (params) => `${params.row.rule?.ruleId}`,
    },
    {
      field: 'ruleAffected',
      headerName: 'Rule Affected',
      width: 100,
      valueGetter: (params) => `${params.row.rule?.rule.affected}`,
    },
    {
      field: 'ruleNegation',
      headerName: 'Rule Negation',
      width: 100,
      valueGetter: (params) => `${params.row.rule?.rule.negation}`,
    },
    {
      field: 'ruleUriDataName',
      headerName: 'Rule URI Data Name',
      width: 300,
      valueGetter: (params) => `${params.row.rule?.rule.uriData?.name}`,
    },
    {
      field: 'ruleUriDataDescription',
      headerName: 'Rule URI Data Description',
      width: 500,
      valueGetter: (params) => `${params.row.rule?.rule.uriData?.description}`,
    },
    {
      field: 'ruleUriDataEvidenceDescription',
      headerName: 'Rule URI Data Evidence Description',
      width: 200,
      valueGetter: (params) =>
        `${params.row.rule?.rule.uriData?.evidenceDescription}`,
    },
    {
      field: 'ruleCategory',
      headerName: 'Rule Category',
      width: 140,
      valueGetter: (params) => {
        return isJurisdictionRuleInCategory(params.row.rule, 'positive')
          ? 'Positive'
          : 'Negative';
      },
      renderCell: (params) => {
        return isJurisdictionRuleInCategory(params.row.rule, 'positive') ? (
          <Typography sx={{ color: 'success.main' }}>Positive</Typography>
        ) : (
          <Typography sx={{ color: 'danger.main' }}>Negative</Typography>
        );
      },
    },
    {
      field: 'ruleEffects',
      headerName: 'Rule Effects',
      width: 320,
      valueGetter: (params) => JSON.stringify(params.row.rule?.effects),
      renderCell: (params) => (
        <Stack>
          {params.row.rule?.effects.map((effect, index) => {
            return (
              <Stack key={index} direction="row" spacing={2}>
                <Typography variant="body2">
                  {capitalize(effect.name)}
                </Typography>
                <Typography variant="body2">|</Typography>
                {effect.direction === REPUTATION_RATING.positive.direction ? (
                  <Typography variant="body2" sx={{ color: 'success.main' }}>
                    Is Positive
                  </Typography>
                ) : (
                  <Typography variant="body2" sx={{ color: 'danger.main' }}>
                    Is Negative
                  </Typography>
                )}
                <Typography variant="body2">|</Typography>
                <Typography variant="body2">Value: {effect.value}</Typography>
              </Stack>
            );
          })}
        </Stack>
      ),
    },
    {
      field: 'ruleConfirmationRuling',
      headerName: 'Rule Confirmation Ruling',
      width: 100,
      valueGetter: (params) => `${params.row.rule?.confirmation.ruling}`,
    },
    {
      field: 'ruleConfirmationEvidence',
      headerName: 'Rule Confirmation Evidence',
      width: 100,
      valueGetter: (params) => `${params.row.rule?.confirmation.evidence}`,
    },
    {
      field: 'ruleConfirmationWitness',
      headerName: 'Rule Confirmation Witness',
      width: 100,
      valueGetter: (params) => `${params.row.rule?.confirmation.witness}`,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem
          key="viewJson"
          icon={<DataObjectOutlined />}
          label="View as JSON"
          onClick={() =>
            showDialog(
              <JsonViewDialog json={params.row} onClose={closeDialog} />,
            )
          }
        />,
        <GridActionsCellItem
          key="addRuleToAction"
          icon={<AddOutlined />}
          label="Add Rule to Action"
          showInMenu
          onClick={() =>
            showDialog(
              <RuleManageDialog
                about={params.row.action.guid}
                onClose={closeDialog}
              />,
            )
          }
        />,
        <GridActionsCellItem
          key="updateAction"
          icon={<ModeEditOutline />}
          label="Update Action"
          showInMenu
          onClick={() =>
            showDialog(
              <ActionManageDialog
                action={params.row.action}
                onClose={closeDialog}
              />,
            )
          }
        />,
        <GridActionsCellItem
          key="updateRule"
          icon={<ModeEditOutline />}
          label="Update Rule"
          showInMenu
          onClick={() =>
            showDialog(
              <RuleManageDialog rule={params.row.rule} onClose={closeDialog} />,
            )
          }
        />,
      ],
    },
  ];

  async function loadData() {
    try {
      setRows([]);
      setIsLoading(true);
      const rows = [];
      const actions = await getActions();
      for (const action of actions) {
        const actionRules = await getJusirsdictionRules(
          null,
          null,
          action.guid,
        );
        if (actionRules?.length > 0) {
          for (const rule of actionRules) {
            rows.push({ action: action, rule: rule });
          }
        } else {
          rows.push({ action: action });
        }
      }
      setRows(rows);
    } catch (error) {
      showToastError(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ height: 800, ...sx }}>
      <DataGrid
        loading={isLoading}
        rows={rows}
        columns={columns}
        pageSize={50}
        rowsPerPageOptions={[50]}
        getRowId={(row) => `${row.action.guid}_${row.rule?.id}`}
        components={{
          Toolbar: GridToolbar,
        }}
      />
    </Box>
  );
}

function JsonViewDialog({ json, isClose, onClose }) {
  const [isOpen, setIsOpen] = useState(!isClose);

  async function close() {
    setIsOpen(false);
    onClose();
  }

  return (
    <Dialog open={isOpen} onClose={close} maxWidth="md" fullWidth>
      <DialogTitle>JSON VIew</DialogTitle>
      <DialogContent sx={{ p: 4, overflowX: 'scroll' }}>
        <pre>{JSON.stringify(json, null, 2)}</pre>
      </DialogContent>
    </Dialog>
  );
}
