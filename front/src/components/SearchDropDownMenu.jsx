import * as React from "react";
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Divider from '@mui/material/Divider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useEffect, useState } from 'react';
import { Box } from "@mui/material";

const SearchDropDownMenu = (props) => {
    const {
        options, // a list of options for searching criteria, e.g. studio name, class name
        setSearchRequired,
        optionChose,
        setOptionChose,
    } = props

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClickDropDown = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleCloseDropDown = (event) => {
        setAnchorEl(null);
        if (event.currentTarget.innerHTML) {
            setOptionChose(event.currentTarget.innerHTML);
            setSearchRequired(true);
        }
    };

    // https://mui.com/material-ui/react-menu/
    const StyledMenu = styled((props) => (
        <Menu
            elevation={0}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            {...props}
        />
    ))(({ theme }) => ({
        '& .MuiPaper-root': {
            borderRadius: 6,
            marginTop: theme.spacing(1),
            minWidth: 180,
            color:
                theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
            boxShadow:
                'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
            '& .MuiMenu-list': {
                padding: '4px 0',
            },
            '& .MuiMenuItem-root': {
                '& .MuiSvgIcon-root': {
                    fontSize: 18,
                    color: theme.palette.text.secondary,
                    marginRight: theme.spacing(1.5),
                },
                '&:active': {
                    backgroundColor: alpha(
                        theme.palette.primary.main,
                        theme.palette.action.selectedOpacity,
                    ),
                },
            },
        },
    }));

    {/* https://mui.com/material-ui/react-menu/ */ }
    return (
        <Box mb={0.5} mt={1}>
            <Button
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                disableElevation
                onClick={handleClickDropDown}
                endIcon={<KeyboardArrowDownIcon />}
                fontSize='medium'
                sx={{
                    backgroundColor: 'rgb(239, 122, 20)',
                    "&:hover": {
                        backgroundColor: 'rgb(209, 101, 6)'
                    }
                }}
            >
                <FilterAltIcon />
                {!optionChose && <>Search By:</>}
                {optionChose && <>Search By: {optionChose}</>}
            </Button>
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseDropDown}
            >
                {options.map((option, index) => (
                    [
                        <div key={index}>
                            <MenuItem onClick={handleCloseDropDown} disableRipple>{option}</MenuItem>
                            {index !== options.length - 1 && <Divider sx={{ my: 0.5 }} />}
                        </div>
                    ]

                ))}
            </StyledMenu>
        </Box>

    )
}

export default SearchDropDownMenu;
