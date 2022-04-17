import { ArrowForwardOutlined } from '@mui/icons-material';
import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  Typography,
} from '@mui/material';
import useRule from 'hooks/useRule';
import { useEffect, useState } from 'react';

/**
 * A widget to select case action.
 */
export default function CaseActionSelect(props) {
  const propsValue = props.value;
  const propsDisabled = props.disabled;
  const propsOnChange = props.onChange;
  const propsLaws = props.formContext?.laws;
  const propsFormCategory = props.formContext?.formData?.category;
  const { isRuleInCategory } = useRule();
  const [items, setItems] = useState([]);

  /**
   * Get actions from laws and add it to items if action has any rule in the specified category.
   */
  useEffect(() => {
    if (propsLaws) {
      const items = [];
      [...propsLaws.keys()].forEach((key) => {
        let isActionInCategory = false;
        propsLaws.get(key).rules.forEach((lawRule) => {
          if (isRuleInCategory(lawRule.rule, propsFormCategory)) {
            isActionInCategory = true;
          }
        });
        if (isActionInCategory) {
          items.push({
            action: propsLaws.get(key).action,
            actionUriData: propsLaws.get(key).actionUriData,
          });
        }
      });
      setItems(items);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propsLaws, propsFormCategory]);

  return (
    <Box>
      <Typography sx={{ fontWeight: 'bold' }}>Action</Typography>
      <Divider sx={{ my: 1.5 }} />
      <List>
        {items.map((item, index) => (
          <ListItemButton
            sx={{ py: 2.4 }}
            key={index}
            selected={item.action.guid === propsValue}
            disabled={propsDisabled}
            onClick={() => propsOnChange(item.action.guid)}
          >
            <ListItemIcon>
              <ArrowForwardOutlined />
            </ListItemIcon>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                flexDirection: 'column',
              }}
            >
              <Typography sx={{ fontWeight: 'bold' }} gutterBottom>
                {item?.actionUriData?.name || 'None Name'}
              </Typography>
              <Typography variant="body2">
                {item?.actionUriData?.description || 'None Description'}
              </Typography>
            </Box>
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
