import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { ContentType as CONTENT_TYPE } from '../models/content-types';
import { cryptoOptions as CRYPTO_OPTIONS, CryptoOption } from '../models/crypto-options';
import { InvestorType as INVESTOR_TYPE } from '../models/investor-type';
import { UpdateUserDataDto } from '../models/updateUserData.interface';
import { UserData } from '../models/user-data';
import { UserManagerService } from '../services/user-manager.service';
import { SelectContent } from "./components/select-content/select-content";
import { SelectCrypto } from "./components/select-crypto/select-crypto";
import { SelectInvestorType } from "./components/select-investor-type/select-investor-type";

@Component({
  selector: 'app-onboarding-page',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    SelectCrypto,
    SelectInvestorType,
    MatRadioModule,
    ReactiveFormsModule,
    SelectContent
  ],
  templateUrl: './onboarding-page.html',
  styleUrl: './onboarding-page.scss',
})
export class OnboardingPage {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  cryptoOptions: CryptoOption[] = CRYPTO_OPTIONS;
  selectedCryptos: string[] = [];
  investorTypes: string[] = INVESTOR_TYPE;
  selectedInvestorType: string | null = null;

  contentTypes: string[] = CONTENT_TYPE;
  selectedContentTypes: string[] = [];

  isLoading = false;


  constructor(private fb: FormBuilder, private userManagerService: UserManagerService, private router: Router) {
    this.firstFormGroup = this.fb.group({
      firstCtrl: ['', Validators.required],
    });

    this.secondFormGroup = this.fb.group({
      investorType: [null, Validators.required],
    });
    this.thirdFormGroup = this.fb.group({
      investorType: [null, Validators.required],
    });
  }

  public toggleCrypto(option: CryptoOption): void {
    const index = this.selectedCryptos.indexOf(option.id);

    if (index !== -1) {
      this.selectedCryptos.splice(index, 1);
      return;
    }

    this.selectedCryptos.push(option.id);
  }

  public toggleInvestorType(type: string): void {
    const nextValue = this.selectedInvestorType === type ? null : type;
    this.selectedInvestorType = nextValue;
    this.secondFormGroup.get('investorType')?.setValue(nextValue);
    this.secondFormGroup.markAsDirty();
    this.secondFormGroup.markAsTouched();
  }

  public toggleContentType(contentType: string): void {
    const index = this.selectedContentTypes.indexOf(contentType);
    if (index !== -1) {
      this.selectedContentTypes.splice(index, 1);
      return;
    }
    this.selectedContentTypes.push(contentType);
    console.log(this.selectedContentTypes);
  }
  public submitNewUserData() {
    const payload: UpdateUserDataDto = {
      assets: this.selectedCryptos,
      investorType: this.selectedInvestorType,
      contentType: this.selectedContentTypes
    };
    this.userManagerService.updateUserData(this.userManagerService.currentUserData._id, payload).subscribe({
      next: (res) => {
        localStorage.setItem('currentUserData', JSON.stringify(res));
        this.userManagerService.currentUserData = res as UserData;

      },
      error: (err) => { console.error('Create failed:', err) }
    });




  }

  public async finishSetup() {

    await this.submitNewUserData();
    this.isLoading = true;

    setTimeout(() => {
      console.log('User Data Submitted', {
        cryptos: this.selectedCryptos,
        type: this.selectedInvestorType,
        content: this.selectedContentTypes
      });

      this.router.navigate(['/dashboards']);
    }, 2000);
  }
}
