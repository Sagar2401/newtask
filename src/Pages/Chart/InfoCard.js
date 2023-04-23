import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function InfoBox({ title, cases, total }) {
    return (
        <div>
            <Card>
                <CardContent>
                    <Typography className="infoBox__title" color="textSecondary">
                        {title}{" "}
                    </Typography>
                    <h2 className="infoBox__cases">{cases}</h2>
                    <Typography className="infoBox__total" color="textSecondary">
                        {total} Total{" "}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}

export default InfoBox;
