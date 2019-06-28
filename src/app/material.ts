import { MatDatepickerModule, MatInputModule, MatNativeDateModule, MatIconModule, MatOptionModule, MatButtonModule, MatCheckboxModule} from '@angular/material';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
    imports:[MatDatepickerModule, MatInputModule, MatNativeDateModule, MatIconModule, MatOptionModule, MatSelectModule, MatButtonModule, MatCheckboxModule, MatToolbarModule],
    exports:[MatDatepickerModule, MatInputModule, MatNativeDateModule, MatIconModule, MatOptionModule, MatSelectModule, MatButtonModule, MatCheckboxModule, MatToolbarModule]

})

export class MaterialModule {}

