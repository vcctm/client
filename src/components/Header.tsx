import { Button as MUIButton } from '@mui/material';
import { makeStyles, withStyles } from 'tss-react/mui';

import { CSSProperties, useState } from 'react';
export type Props = {
  className?: string;
  children?: React.ReactNode;
};

export function Header({ className, children }: Props) {
  const [isClicked, setIsClicked] = useState(false);
  const { classes, cx } = useStyles({ color: isClicked ? 'yellow' : 'red' });

  return (
    <MUIButton className={cx(classes.root, className)} onClick={() => setIsClicked(true)}>
      {children}
    </MUIButton>
  );
}

interface StyleProps {
  color: CSSProperties['color'];
}

const useStyles = makeStyles<StyleProps>()((theme, { color }) => ({
  root: {
    fontFamily: 'Wotfard',
    color,
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}));
